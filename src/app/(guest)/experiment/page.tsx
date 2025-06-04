'use client'
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ModelPerformance {
  model: string;
  category: string;
  week2: { accuracy: number; f1_macro: number; auc_macro: number };
  week4: { accuracy: number; f1_macro: number; auc_macro: number };
  week6: { accuracy: number; f1_macro: number; auc_macro: number };
  week8: { accuracy: number; f1_macro: number; auc_macro: number };
}

const Experiment: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const modelData: ModelPerformance[] = [
    {
      model: 'Hồi quy Softmax Logistic',
      category: 'Traditional ML',
      week2: { accuracy: 0.74, f1_macro: 0.23, auc_macro: 0.71 },
      week4: { accuracy: 0.72, f1_macro: 0.23, auc_macro: 0.79 },
      week6: { accuracy: 0.72, f1_macro: 0.37, auc_macro: 0.77 },
      week8: { accuracy: 0.72, f1_macro: 0.24, auc_macro: 0.72 }
    },
    {
      model: 'Decision Tree',
      category: 'Traditional ML',
      week2: { accuracy: 0.60, f1_macro: 0.23, auc_macro: 0.55 },
      week4: { accuracy: 0.64, f1_macro: 0.20, auc_macro: 0.52 },
      week6: { accuracy: 0.61, f1_macro: 0.21, auc_macro: 0.49 },
      week8: { accuracy: 0.54, f1_macro: 0.19, auc_macro: 0.72 }
    },
    {
      model: 'Random Forest',
      category: 'Traditional ML',
      week2: { accuracy: 0.82, f1_macro: 0.25, auc_macro: 0.82 },
      week4: { accuracy: 0.81, f1_macro: 0.21, auc_macro: 0.79 },
      week6: { accuracy: 0.82, f1_macro: 0.19, auc_macro: 0.72 },
      week8: { accuracy: 0.82, f1_macro: 0.18, auc_macro: 0.72 }
    },
    {
      model: 'REP Tree',
      category: 'Traditional ML',
      week2: { accuracy: 0.64, f1_macro: 0.26, auc_macro: 0.60 },
      week4: { accuracy: 0.59, f1_macro: 0.21, auc_macro: 0.54 },
      week6: { accuracy: 0.62, f1_macro: 0.21, auc_macro: 0.49 },
      week8: { accuracy: 0.62, f1_macro: 0.23, auc_macro: 0.59 }
    },
    {
      model: 'KNN',
      category: 'Traditional ML',
      week2: { accuracy: 0.78, f1_macro: 0.27, auc_macro: 0.56 },
      week4: { accuracy: 0.75, f1_macro: 0.24, auc_macro: 0.57 },
      week6: { accuracy: 0.78, f1_macro: 0.23, auc_macro: 0.64 },
      week8: { accuracy: 0.69, f1_macro: 0.21, auc_macro: 0.71 }
    },
    {
      model: 'SVM',
      category: 'Traditional ML',
      week2: { accuracy: 0.82, f1_macro: 0.19, auc_macro: 0.74 },
      week4: { accuracy: 0.80, f1_macro: 0.18, auc_macro: 0.74 },
      week6: { accuracy: 0.81, f1_macro: 0.18, auc_macro: 0.73 },
      week8: { accuracy: 0.80, f1_macro: 0.18, auc_macro: 0.70 }
    },
    {
      model: 'Naive Bayes',
      category: 'Traditional ML',
      week2: { accuracy: 0.25, f1_macro: 0.15, auc_macro: 0.54 },
      week4: { accuracy: 0.22, f1_macro: 0.13, auc_macro: 0.54 },
      week6: { accuracy: 0.26, f1_macro: 0.16, auc_macro: 0.57 },
      week8: { accuracy: 0.25, f1_macro: 0.14, auc_macro: 0.57 }
    },
    {
      model: 'LightGBM',
      category: 'Boosting',
      week2: { accuracy: 0.83, f1_macro: 0.42, auc_macro: 0.84 },
      week4: { accuracy: 0.82, f1_macro: 0.30, auc_macro: 0.86 },
      week6: { accuracy: 0.82, f1_macro: 0.34, auc_macro: 0.86 },
      week8: { accuracy: 0.81, f1_macro: 0.25, auc_macro: 0.81 }
    },
    {
      model: 'XGBoost',
      category: 'Boosting',
      week2: { accuracy: 0.84, f1_macro: 0.40, auc_macro: 0.89 },
      week4: { accuracy: 0.83, f1_macro: 0.27, auc_macro: 0.87 },
      week6: { accuracy: 0.83, f1_macro: 0.34, auc_macro: 0.82 },
      week8: { accuracy: 0.82, f1_macro: 0.30, auc_macro: 0.74 }
    },
    {
      model: 'CatBoost',
      category: 'Boosting',
      week2: { accuracy: 0.82, f1_macro: 0.25, auc_macro: 0.83 },
      week4: { accuracy: 0.81, f1_macro: 0.22, auc_macro: 0.85 },
      week6: { accuracy: 0.82, f1_macro: 0.21, auc_macro: 0.84 },
      week8: { accuracy: 0.78, f1_macro: 0.24, auc_macro: 0.79 }
    },
    {
      model: 'Tabnet Classifier',
      category: 'Deep Learning',
      week2: { accuracy: 0.74, f1_macro: 0.25, auc_macro: 0.69 },
      week4: { accuracy: 0.68, f1_macro: 0.23, auc_macro: 0.62 },
      week6: { accuracy: 0.69, f1_macro: 0.22, auc_macro: 0.59 },
      week8: { accuracy: 0.69, f1_macro: 0.19, auc_macro: 0.48 }
    },
    {
      model: 'FNN',
      category: 'Deep Learning',
      week2: { accuracy: 0.77, f1_macro: 0.25, auc_macro: 0.68 },
      week4: { accuracy: 0.78, f1_macro: 0.33, auc_macro: 0.80 },
      week6: { accuracy: 0.75, f1_macro: 0.23, auc_macro: 0.69 },
      week8: { accuracy: 0.64, f1_macro: 0.29, auc_macro: 0.69 }
    },
    {
      model: 'CNN',
      category: 'Deep Learning',
      week2: { accuracy: 0.82, f1_macro: 0.27, auc_macro: 0.79 },
      week4: { accuracy: 0.82, f1_macro: 0.24, auc_macro: 0.78 },
      week6: { accuracy: 0.82, f1_macro: 0.24, auc_macro: 0.82 },
      week8: { accuracy: 0.82, f1_macro: 0.19, auc_macro: 0.73 }
    },
    {
      model: 'RNN',
      category: 'Deep Learning',
      week2: { accuracy: 0.82, f1_macro: 0.27, auc_macro: 0.73 },
      week4: { accuracy: 0.81, f1_macro: 0.28, auc_macro: 0.77 },
      week6: { accuracy: 0.82, f1_macro: 0.30, auc_macro: 0.81 },
      week8: { accuracy: 0.78, f1_macro: 0.36, auc_macro: 0.75 }
    },
    {
      model: 'LSTM',
      category: 'Deep Learning',
      week2: { accuracy: 0.82, f1_macro: 0.29, auc_macro: 0.75 },
      week4: { accuracy: 0.82, f1_macro: 0.26, auc_macro: 0.80 },
      week6: { accuracy: 0.83, f1_macro: 0.29, auc_macro: 0.79 },
      week8: { accuracy: 0.81, f1_macro: 0.29, auc_macro: 0.71 }
    },
    {
      model: 'BiLSTM',
      category: 'Deep Learning',
      week2: { accuracy: 0.82, f1_macro: 0.28, auc_macro: 0.77 },
      week4: { accuracy: 0.81, f1_macro: 0.25, auc_macro: 0.77 },
      week6: { accuracy: 0.82, f1_macro: 0.31, auc_macro: 0.77 },
      week8: { accuracy: 0.82, f1_macro: 0.29, auc_macro: 0.75 }
    },
    {
      model: '4-layer Stacked LSTM',
      category: 'Deep Learning',
      week2: { accuracy: 0.80, f1_macro: 0.24, auc_macro: 0.72 },
      week4: { accuracy: 0.81, f1_macro: 0.25, auc_macro: 0.72 },
      week6: { accuracy: 0.82, f1_macro: 0.30, auc_macro: 0.79 },
      week8: { accuracy: 0.81, f1_macro: 0.28, auc_macro: 0.72 }
    },
    {
      model: 'GNN',
      category: 'Deep Learning',
      week2: { accuracy: 0.63, f1_macro: 0.21, auc_macro: 0.47 },
      week4: { accuracy: 0.80, f1_macro: 0.26, auc_macro: 0.54 },
      week6: { accuracy: 0.59, f1_macro: 0.21, auc_macro: 0.47 },
      week8: { accuracy: 0.77, f1_macro: 0.23, auc_macro: 0.45 }
    },
    {
      model: 'ANN-LSTM',
      category: 'Deep Learning',
      week2: { accuracy: 0.82, f1_macro: 0.27, auc_macro: 0.67 },
      week4: { accuracy: 0.81, f1_macro: 0.26, auc_macro: 0.76 },
      week6: { accuracy: 0.82, f1_macro: 0.27, auc_macro: 0.80 },
      week8: { accuracy: 0.82, f1_macro: 0.30, auc_macro: 0.75 }
    },
    {
      model: 'SNN',
      category: 'Deep Learning',
      week2: { accuracy: 0.82, f1_macro: 0.30, auc_macro: 0.74 },
      week4: { accuracy: 0.82, f1_macro: 0.26, auc_macro: 0.71 },
      week6: { accuracy: 0.83, f1_macro: 0.26, auc_macro: 0.74 },
      week8: { accuracy: 0.57, f1_macro: 0.19, auc_macro: 0.63 }
    }
  ];

  const groupedModels: Record<string, ModelPerformance[]> = {};
  modelData.forEach(model => {
    const category = model.category || 'Other';
    if (!groupedModels[category]) groupedModels[category] = [];
    groupedModels[category].push(model);
  });

  return (
    <div className={`flex flex-col items-center w-full p-6 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h2 className="text-3xl font-bold mb-6">Model Performance Comparison (Week 2-8)</h2>

      <div className={`w-full max-w-7xl rounded-xl shadow-md overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className={`transition-colors duration-300 ${isDark ? 'bg-cyan-700' : 'bg-cyan-500'}`}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Model</th>
                <th className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white" colSpan={3}>Week 2</th>
                <th className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white" colSpan={3}>Week 4</th>
                <th className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white" colSpan={3}>Week 6</th>
                <th className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white" colSpan={3}>Week 8</th>
              </tr>
              <tr className={`transition-colors duration-300 ${isDark ? 'bg-cyan-600' : 'bg-cyan-400'}`}>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-white"></th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">Acc</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">F1</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">AUC</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">Acc</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">F1</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">AUC</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">Acc</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">F1</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">AUC</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">Acc</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">F1</th>
                <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">AUC</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedModels).map((category) => (
                <React.Fragment key={category}>
                  <tr className={`${isDark ? 'bg-cyan-300/10' : 'bg-cyan-400/10'}`}>
                    <td colSpan={13} className="px-4 py-2 text-sm font-semibold">
                      {category}
                    </td>
                  </tr>
                  {groupedModels[category].map((model, i) => (
                    <tr key={`${category}-${model.model}`} className={`${i % 2 === 0 ? (isDark ? 'bg-gray-800' : 'bg-white') : (isDark ? 'bg-gray-700' : 'bg-gray-50')}`}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{model.model}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week2.accuracy.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week2.f1_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week2.auc_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week4.accuracy.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week4.f1_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week4.auc_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week6.accuracy.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week6.f1_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week6.auc_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week8.accuracy.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week8.f1_macro.toFixed(2)}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-center">{model.week8.auc_macro.toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`mt-8 w-full max-w-7xl rounded-xl shadow-md p-6 transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold mb-4">Nhận xét</h3>
        <div className={`rounded-lg px-4 py-3 text-sm ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
          <p className="mb-2"><strong>Mô hình tốt nhất:</strong> XGBoost (tuần 2: Acc=0.84, F1=0.40, AUC=0.89) và LightGBM (tuần 2: Acc=0.83, F1=0.42, AUC=0.84) dẫn đầu về hiệu năng tổng thể.</p>
          <p className="mb-2"><strong>Xu hướng theo thời gian:</strong> Hầu hết mô hình có xu hướng giảm hiệu năng từ tuần 2 đến tuần 8, đặc biệt rõ ở các mô hình Boosting.</p>
          <p className="mb-2"><strong>Mất cân bằng dữ liệu:</strong> F1-macro thấp hơn đáng kể so với Accuracy (0.15-0.42 vs 0.25-0.84), cho thấy dữ liệu mất cân bằng nhãn nghiêm trọng.</p>
          <p><strong>Deep Learning:</strong> LSTM, BiLSTM, RNN cho kết quả ổn định qua các tuần. SNN có tiềm năng nhưng không ổn định ở tuần 8.</p>
        </div>
      </div>

      <div className={`mt-8 w-full max-w-7xl rounded-xl shadow-md p-6 transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold mb-4">Model Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-600">Traditional ML:</span>
            <ul className="mt-1 text-xs space-y-1">
              <li>• Logistic Regression</li>
              <li>• Decision Tree</li>
              <li>• Random Forest</li>
              <li>• REP Tree</li>
              <li>• KNN</li>
              <li>• SVM</li>
              <li>• Naive Bayes</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-green-600">Boosting:</span>
            <ul className="mt-1 text-xs space-y-1">
              <li>• LightGBM</li>
              <li>• XGBoost</li>
              <li>• CatBoost</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-purple-600">Deep Learning:</span>
            <ul className="mt-1 text-xs space-y-1">
              <li>• Tabnet Classifier</li>
              <li>• FNN</li>
              <li>• CNN</li>
              <li>• RNN</li>
              <li>• LSTM</li>
              <li>• BiLSTM</li>
              <li>• 4-layer Stacked LSTM</li>
              <li>• GNN</li>
              <li>• ANN-LSTM</li>
              <li>• SNN</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiment;