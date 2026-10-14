// Samples define shortest-arc segments, not an inferred physical trajectory.
export function projectTurn(u){
  if(!Number.isFinite(u)||Math.abs(u)>1e6)throw new RangeError('提升坐标必须有限且绝对值不超过 10⁶');
  const rest=u%1;
  // Avoid adding 1 to small positive values: that would erase short moves.
  const result=rest<0?rest+1:rest;
  if(result===1)throw new RangeError('这个负小角度在 [0,1) 中无法表示；请增大移动步长，路径未改变');
  return result===0?0:result;
}
// Exact dyadic units: every nonnegative binary64 equals N * 2^-1074.
// Only the comparison is integer arithmetic; no distance/angle is quantized.
const bits=new DataView(new ArrayBuffer(8));
function units(value){
  bits.setFloat64(0,value);
  const word=bits.getBigUint64(0),exp=Number((word>>52n)&2047n),fraction=word&((1n<<52n)-1n);
  return exp===0?fraction:((1n<<52n)|fraction)<<BigInt(exp-1);
}
const HALF=1n<<1073n;
export function liftNext(previous,sample){
  if(!previous||!Number.isInteger(previous.sheet)||Math.abs(previous.sheet)>1e6||
    !Number.isFinite(previous.turn)||previous.turn<0||previous.turn>=1)throw new RangeError('提升状态须含有效整数层与圆周坐标');
  if(!Number.isFinite(sample)||sample<0||sample>=1)throw new RangeError('圆周样本须在 [0,1)');
  // Decide the arc before adding a sheet: near-antipodes otherwise round
  // differently on different sheets. The state retains the original sample.
  const delta=units(sample)-units(previous.turn);
  if(delta===HALF||delta===-HALF)throw new RangeError('对径点之间有两条最短弧；请加入中间点');
  const sheet=previous.sheet+(delta>HALF?-1:delta< -HALF?1:0);
  if(Math.abs(sheet)>1e6)throw new RangeError('提升超出教学坐标范围');
  return {sheet,turn:sample};
}
export function liftPath(samples,sheet=0){
  if(!Array.isArray(samples)||samples.length===0||samples[0]!==0)throw new RangeError('路径从圆周坐标 0 开始');
  if(!Number.isInteger(sheet)||Math.abs(sheet)>1000)throw new RangeError('初始层须为 -1000 到 1000 的整数');
  const states=[{sheet,turn:0}];
  for(const sample of samples.slice(1))states.push(liftNext(states.at(-1),sample));
  // No tolerance converts an almost-loop into a loop.
  const closed=samples.at(-1)===0;
  return {states,lift:states.map(s=>s.sheet+s.turn),closed,winding:closed?states.at(-1).sheet-sheet:null};
}
export function loopSamples(turns){
  if(!Number.isInteger(turns)||Math.abs(turns)>10)throw new RangeError('预设圈数须为 -10 到 10');
  return Array.from({length:Math.abs(turns)*8+1},(_,i)=>projectTurn(Math.sign(turns)*i/8));
}
