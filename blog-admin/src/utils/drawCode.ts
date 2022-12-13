// 产生随机数
function rn(min: number, max: number) {
  const n = Math.floor(Math.random() * (max - min + 1) + min);
  return n;
}

// 产生随机颜色
function rc(min: number, max: number) {
  const r = rn(min, max);
  const g = rn(min, max);
  const b = rn(min, max);
  const color = `rgb(${r},${g},${b})`;
  return color;
}

function drawCode(el: HTMLCanvasElement, code: string) {
  const ctx = el.getContext('2d');
  if (!ctx) {
    return;
  }
  // 画出浅色验证码背景
  ctx.fillStyle = rc(180, 230);
  ctx.fillRect(0, 0, 120, 40);
  code.split('').forEach((element, index) => {
    const rd = rn(-45, 45);
    const rs = rn(18, 30);
    ctx.save();
    ctx.fillStyle = rc(0, 255);
    ctx.textBaseline = 'alphabetic';
    ctx.font = `${rs}px Arial`;
    // 平移原点
    ctx.translate(10 + index * 22, 30);
    // 旋转画笔
    ctx.rotate((rd * Math.PI) / 180);
    // 画出数字
    ctx.fillText(element, 0, 0);
    // 恢复画笔
    ctx.restore();
  });

  // 绘制3条随机干扰线
  for (let i = 0; i < 3; i += 1) {
    ctx.lineWidth = 1;
    // 设置描边的颜色随机
    ctx.strokeStyle = rc(0, 255);
    // 开始一条新路径
    ctx.beginPath();
    // 移动到随机位置
    ctx.moveTo(rn(0, 0 + 120), rn(0, 40));
    // 到随机点画一条路径
    ctx.lineTo(rn(0, 0 + 120), rn(0, 40));
    // 描边
    ctx.stroke();
  }

  // 绘制30个干扰点
  for (let i = 0; i < 30; i += 1) {
    // 设置填充随机颜色
    ctx.fillStyle = rc(80, 180);
    // 开始新路径
    ctx.beginPath();
    // 绘制圆
    ctx.arc(rn(5, 0 + 120), rn(0, 40), 1, 0, 2 * Math.PI);
    // 填充
    ctx.fill();
  }
}

export default drawCode;
