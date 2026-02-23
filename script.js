// 品種ごとの調整係数
const cultivarSettings = {
  "ゆたかみどり": { steam: 1.2, roll: 1.0, dry: 1.1 }, // 蒸し長め
  "さえみどり": { steam: 0.9, roll: 0.9, dry: 1.0 },   // 短め・色重視
  "あさつゆ": { steam: 1.0, roll: 1.0, dry: 1.0 }     // 標準
};

// 基本工程時間 (分)
const baseDurations = {
  steaming: 2,    // 蒸し
  primary: 45,    // 粗揉
  rolling: 20,    // 揉捻
  secondary: 35,  // 中揉
  final_roll: 45, // 精揉
  drying: 25      // 乾燥
};

function generateBatchTimeline(startTime, cultivar) {
  const adj = cultivarSettings[cultivar] || { steam: 1, roll: 1, dry: 1 };
  let current = new Date(startTime);
  
  return {
    cultivar: cultivar,
    steps: [
      { name: "蒸し", duration: Math.round(baseDurations.steaming * adj.steam) },
      { name: "粗揉", duration: Math.round(baseDurations.primary * adj.roll) },
      { name: "揉捻", duration: Math.round(baseDurations.rolling * adj.roll) },
      { name: "中揉", duration: Math.round(baseDurations.secondary * adj.roll) },
      { name: "精揉", duration: Math.round(baseDurations.final_roll * adj.roll) },
      { name: "乾燥", duration: Math.round(baseDurations.drying * adj.dry) }
    ].map(step => {
      const start = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      current.setMinutes(current.getMinutes() + step.duration);
      const end = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return { ...step, start, end };
    })
  };
}
