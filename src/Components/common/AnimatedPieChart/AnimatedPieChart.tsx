import React from 'react';
import { motion } from 'framer-motion'; // অ্যানিমেশনের জন্য framer-motion ব্যবহার করা হচ্ছে।

// Props-এর টাইপ ডিফাইন করা হচ্ছে।
interface ChartData {
  title: string;
  value: number;
  color: string;
}

interface AnimatedPieChartProps {
  data: ChartData[];
  size?: number;
}

// একটি সেগমেন্ট (টুকরা) আঁকার জন্য হেল্পার ফাংশন।
const getArcPath = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = {
    x: x + radius * Math.cos(startAngle),
    y: y + radius * Math.sin(startAngle),
  };
  const end = {
    x: x + radius * Math.cos(endAngle),
    y: y + radius * Math.sin(endAngle),
  };
  const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

// মূল পাই চার্ট কম্পোনেন্ট।
const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let startAngle = -Math.PI / 2; // -90 degrees (top of the circle)

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g>
          {data.map((segment, index) => {
            const percentage = segment.value / total;
            const angle = percentage * 2 * Math.PI;
            const endAngle = startAngle + angle;
            const path = getArcPath(size / 2, size / 2, size / 2 - 20, startAngle, endAngle);
            
            // পরবর্তী সেগমেন্টের জন্য начальный কোণ আপডেট করা হচ্ছে।
            startAngle = endAngle;

            return (
              <motion.path
                key={index}
                d={path}
                fill="none"
                stroke={segment.color}
                strokeWidth="25"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut', delay: index * 0.2 }}
              />
            );
          })}
        </g>
      </svg>
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {data.map((segment) => (
          <div key={segment.title} className="flex items-center space-x-2 text-sm">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-gray-300">{segment.title}: {segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedPieChart;