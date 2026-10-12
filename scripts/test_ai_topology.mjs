import test from 'node:test';
import assert from 'node:assert/strict';
import {boundaryMatrix} from '../docs/javascripts/topology-core.mjs';
import {lowerStarPath,pathPersistence,bridgeLoss,pairedBridgeLoss,pixelComplex,maskTopology,diceScore,segmentationPresets} from '../docs/javascripts/ai-topology-core.mjs';

// Independent digital model: closed-square foreground has 8-neighbor adjacency;
// complement regions use 4-neighbor adjacency on a one-cell padded rectangle.
export function digitalBetti(mask) {
  const h=mask.length,w=h?mask[0].length:0;
  function components(grid,value,diagonal) {
    const seen=new Set();let count=0;
    for(let r=0;r<grid.length;r++)for(let c=0;c<grid[0].length;c++)if(grid[r][c]===value&&!seen.has(`${r},${c}`)) {
      count++;const queue=[[r,c]];seen.add(`${r},${c}`);
      for(let i=0;i<queue.length;i++) {
        const [y,x]=queue[i];
        for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++) {
          if(!(dy||dx)||(!diagonal&&Math.abs(dy)+Math.abs(dx)!==1))continue;
          const yy=y+dy,xx=x+dx,key=`${yy},${xx}`;
          if(grid[yy]?.[xx]===value&&!seen.has(key)){seen.add(key);queue.push([yy,xx]);}
        }
      }
    }
    return count;
  }
  const padded=Array.from({length:h+2},(_,r)=>Array.from({length:w+2},(_,c)=>mask[r-1]?.[c-1]??0));
  return [h?components(mask,1,true):0,components(padded,0,false)-1];
}

test('three-vertex persistence retains tiny positive bars and the essential component',()=>{
  for(const t of [0,Number.MIN_VALUE,5e-15,0.25,0.5,1]) {
    const r=bridgeLoss(t);
    assert.deepEqual(r.finite.map(b=>[b.birth,b.death]),t===0?[]:[[0,t]]);
    assert.deepEqual(r.essential.map(b=>[b.birth,b.death]),[[0,Infinity]]);
    assert.deepEqual(r.betti,[t<=.5?1:2,0]);
    assert.equal(r.loss,t*t);assert.equal(r.gradient,2*t);
  }
  // Loss squaring may underflow in binary64; the actual class still survives.
  assert.equal(bridgeLoss(Number.MIN_VALUE).finite.length,1);
});

test('hard loss has the specified half-open event convention',()=>{
  assert.equal(bridgeLoss(.5-Number.EPSILON).hardLoss,0);
  assert.equal(bridgeLoss(.5).hardLoss,0);
  assert.equal(bridgeLoss(.5+Number.EPSILON).hardLoss,1);
  assert.equal(pathPersistence([0,1,0],1).betti[0],1);
  assert.deepEqual(pathPersistence([1],0).betti,[0,0]);
  assert.deepEqual(pathPersistence([0],0).betti,[1,0]);
});

test('four-vertex persistence and local gradients include both orderings and ties',()=>{
  for(const a of [0,5e-15,.25,.5,1])for(const b of [0,5e-15,.25,.5,1]) {
    const r=pairedBridgeLoss(a,b),m=Math.max(a,b);
    assert.deepEqual(r.finite.map(bar=>[bar.birth,bar.death]),m===0?[]:[[0,m]]);
    assert.equal(r.loss,m*m);
    assert.deepEqual(r.gradient,a===b?(a===0?[0,0]:null):a>b?[2*a,0]:[0,2*b]);
  }
});

test('analytic gradient matches differences only inside smooth branches; ties have unequal one-sided slopes',()=>{
  const h=2**-20;
  for(const [a,b] of [[.75,.25],[.25,.75]]) {
    const grad=pairedBridgeLoss(a,b).gradient;
    assert.equal((pairedBridgeLoss(a+h,b).loss-pairedBridgeLoss(a-h,b).loss)/(2*h),grad[0]);
    assert.equal((pairedBridgeLoss(a,b+h).loss-pairedBridgeLoss(a,b-h).loss)/(2*h),grad[1]);
  }
  const c=.5,loss=pairedBridgeLoss(c,c).loss;
  assert.equal((loss-pairedBridgeLoss(c-h,c).loss)/h,0);
  assert.equal((pairedBridgeLoss(c+h,c).loss-loss)/h,1+h);
  assert.equal(pairedBridgeLoss(c,c).gradient,null);
});

test('all 512 three-by-three masks agree with digital components/holes and satisfy chain/Euler identities',()=>{
  for(let bits=0;bits<512;bits++) {
    const mask=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>(bits>>(3*r+c))&1));
    const result=maskTopology(mask);
    assert.deepEqual(result.betti,digitalBetti(mask),`mask ${bits}`);
    assert.equal(result.euler,result.betti[0]-result.betti[1]);
    const cells=pixelComplex(mask),v=cells.filter(s=>s.length===1),e=cells.filter(s=>s.length===2),f=cells.filter(s=>s.length===3);
    const d1=boundaryMatrix(v,e),d2=boundaryMatrix(e,f);
    for(let i=0;i<v.length;i++)for(let j=0;j<f.length;j++) {
      let sum=0;for(let k=0;k<e.length;k++)sum^=d1[i][k]&d2[k][j];
      assert.equal(sum,0);
    }
  }
});

test('same Dice counterexample and bridge removal have exact pixel counts and distinct topology',()=>{
  const p=segmentationPresets();
  assert.deepEqual(maskTopology(p.target).betti,[1,0]);
  assert.deepEqual(maskTopology(p.hole).betti,[1,1]);
  assert.deepEqual(maskTopology(p.notch).betti,[1,0]);
  assert.deepEqual(diceScore(p.hole,p.target),diceScore(p.notch,p.target));
  assert.equal(diceScore(p.hole,p.target).numerator,48);
  assert.equal(diceScore(p.hole,p.target).denominator,49);
  assert.deepEqual(maskTopology(p.bridge).betti,[1,0]);
  assert.deepEqual(maskTopology(p.broken).betti,[2,0]);
  assert.equal(diceScore(p.broken,p.bridge).numerator,24);
  assert.equal(diceScore(p.broken,p.bridge).denominator,25);
});

test('empty, full, diagonal-touch masks and degenerate Dice are explicit',()=>{
  assert.deepEqual(maskTopology([]).betti,[0,0]);
  assert.deepEqual(maskTopology([[0]]).betti,[0,0]);
  assert.deepEqual(maskTopology([[1]]).betti,[1,0]);
  assert.deepEqual(maskTopology([[1,0],[0,1]]).betti,[1,0]);
  assert.equal(diceScore([],[]).emptyConvention,true);
  assert.equal(diceScore([[0]],[[0]]).value,1);
  assert.equal(diceScore([[1]],[[0]]).value,0);
  assert.equal(diceScore([[1]],[[1]]).value,1);
});

test('invalid grids, scores and mismatched comparisons fail explicitly',()=>{
  for(const values of [[],[-1],[NaN],[Infinity],[1.01],Array(2),Array(33).fill(0),null]) assert.throws(()=>lowerStarPath(values));
  for(const mask of [null,[[]],[[1],[1,0]],[[2]],[[NaN]],[Array(2)],[[1],,],Array.from({length:9},()=>[0])]) assert.throws(()=>pixelComplex(mask));
  assert.throws(()=>diceScore([[0]],[[0,0]]));
  assert.throws(()=>bridgeLoss(.5,-.1));
});
