'use client'
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ModelPerformance {
  model: string;
  accuracy: number | string;
  f1_macro: number | string;
  category?: string;
}

const Experiment: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const modelData: ModelPerformance[] = [
    { model: 'KNN', accuracy: '0.85', f1_macro: '0.83', category: 'Traditional ML' },
    { model: 'SVM', accuracy: '0.87', f1_macro: '0.86', category: 'Traditional ML' },
    { model: 'Random Forest', accuracy: '0.89', f1_macro: '0.88', category: 'Traditional ML' },
    { model: 'XGBoost', accuracy: '0.91', f1_macro: '0.90', category: 'Boosting' },
    { model: 'CatBoost', accuracy: '0.92', f1_macro: '0.91', category: 'Boosting' },
    { model: 'CNN', accuracy: '0.93', f1_macro: '0.92', category: 'Deep Learning' },
    { model: 'LSTM', accuracy: '0.94', f1_macro: '0.93', category: 'Deep Learning' },
    { model: 'BiLSTM', accuracy: '0.95', f1_macro: '0.94', category: 'Deep Learning' },
    { model: 'ANN-LSTM', accuracy: '0.96', f1_macro: '0.95', category: 'Deep Learning' },
    { model: 'GNN', accuracy: '0.97', f1_macro: '0.96', category: 'Deep Learning' },
  ];

  const groupedModels: Record<string, ModelPerformance[]> = {};
  modelData.forEach(model => {
    const category = model.category || 'Other';
    if (!groupedModels[category]) groupedModels[category] = [];
    groupedModels[category].push(model);
  });

  return (
    <div className={`flex flex-col items-center w-full p-6 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h2 className="text-3xl font-bold mb-6">Model Performance Comparison</h2>

      <div className={`w-full max-w-4xl rounded-xl shadow-md overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className={`transition-colors duration-300 ${isDark ? 'bg-cyan-700' : 'bg-cyan-500'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Model</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Accuracy</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">F1 (Macro)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedModels).map((category) => (
              <React.Fragment key={category}>
                <tr className={`${isDark ? 'bg-cyan-300/10' : 'bg-cyan-400/10'}`}>
                  <td colSpan={3} className="px-6 py-2 text-sm font-semibold">
                    {category}
                  </td>
                </tr>
                {groupedModels[category].map((model, i) => (
                  <tr key={`${category}-${model.model}`} className={`${i % 2 === 0 ? (isDark ? 'bg-gray-800' : 'bg-white') : (isDark ? 'bg-gray-700' : 'bg-gray-50')}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{model.model}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{typeof model.accuracy === 'number' ? model.accuracy.toFixed(4) : model.accuracy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{typeof model.f1_macro === 'number' ? model.f1_macro.toFixed(4) : model.f1_macro}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-8 w-full max-w-4xl rounded-xl shadow-md p-6 transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
  <h3 className="text-lg font-semibold mb-4">Nhận xét</h3>
  <div className={`rounded-lg px-4 py-3 text-sm ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
    Các mô hình học sâu như BiLSTM, ANN-LSTM và GNN đang cho kết quả rất tốt, vượt trội hơn so với các mô hình truyền thống và boosting. Có thể tiếp tục tối ưu hóa thêm để cải thiện F1.
  </div>
</div>



      <div className={`mt-8 w-full max-w-4xl rounded-xl shadow-md p-6 transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold mb-4">Model Categories</h3>
        <ul className="space-y-2 text-sm">
          <li><span className="font-medium">Traditional ML:</span> KNN, SVM, Random Forest</li>
          <li><span className="font-medium">Boosting:</span> XGBoost, CatBoost</li>
          <li><span className="font-medium">Deep Learning:</span> CNN, LSTM, BiLSTM, ANN-LSTM, GNN</li>
        </ul>
      </div>
    </div>
  );
};

export default Experiment;