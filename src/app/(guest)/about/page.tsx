'use client'
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>MOOC Learning Analytics</title>
        <meta name="description" content="Predicting online learners' academic performance on MOOCs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Learning Analytics Platform
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Project Title Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg shadow mb-8 text-white p-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">ĐỀ TÀI</h2>
            <h3 className="text-xl mb-6">
              DỰ ĐOÁN KẾT QUẢ HỌC TẬP CỦA HỌC VIÊN TRÊN NỀN TẢNG MOOCS
            </h3>
            <p className="text-lg">
              PREDICTING ONLINE LEARNERS' ACADEMIC PERFORMANCE AND EARLY WARNING ON MOOCS
            </p>
          </div>
        </div>
        {/* Project Team Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Implementation Team</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Nguyễn Hồng Phát', id: '22521072', class: 'KHMT2202.3', avatar: '🐱' },
                { name: 'Phạm Thanh Thảo', id: '22521072', class: 'KHMT2202.3', avatar: '🐈' },
                { name: 'Lê Dương Minh Thiên', id: '22521072', class: 'KHMT2202.3', avatar: '🐕' },
                { name: 'Đặng Thanh Ngân', id: '22521072', class: 'KHMT2202.3', avatar: '🦊' },
                { name: 'Đinh Hữu Phước', id: '22521072', class: 'KHMT2202.3', avatar: '🐱' }
              ].map((member, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-cyan-400/10 transition-colors">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-2xl text-white">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.id}</p>
                    <p className="text-sm text-gray-500">{member.class}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Trường Đại học Công nghệ thông tin - Khoa CS
              </p>
            </div>
          </div>
        </div>



        {/* Project Details Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Project Information</h2>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'application', name: 'Application' },
                { id: 'innovation', name: 'Innovation' },
                { id: 'data', name: 'Data' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="flex items-start space-x-6">
                  <div className="bg-cyan-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Mục tiêu</h3>
                    <p className="mt-2 text-gray-600">
                      Trong bối cảnh giáo dục trực tuyến phát triển mạnh mẽ, MOOCs trở thành lựa chọn học tập phổ biến với tính linh hoạt và khả năng tiếp cận rộng rãi. Tuy nhiên, tỷ lệ hoàn thành khoá học thấp và sự thiếu hụt hỗ trợ cá nhân hoá vẫn là thách thức lớn. Phần lớn học viên không đủ kết quả do thiếu động lực, phương pháp học chưa phù hợp hoặc không được hướng dẫn kịp thời.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex items-start space-x-6">
                  <div className="bg-cyan-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Khả năng</h3>
                    <p className="mt-2 text-gray-600">
                      Về mặt học thuật, việc phân loại kết quả học tập theo 5 mức độ dài hơi mà hình học may xử lý đồ thị phức tạp từ nhiều nguồn, đảm bảo độ chính xác và khả năng khái quát trong môi trường học tập đa dạng.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex items-start space-x-6">
                  <div className="bg-cyan-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Ý nghĩa</h3>
                    <p className="mt-2 text-gray-600">
                      Đề tài "Dự đoán kết quả học tập và cảnh báo sớm trên nên tảng MOOCs" hướng đến sự nghiên cứu sâu sắc về khả năng dự đoán và phân loại kết quả học tập của học viên trên các nền tảng MOOCs, từ đó cung cấp hệ thống cảnh báo sớm.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'application' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Ứng dụng</h3>
                <p className="mt-2 text-gray-600">
                  Đề tài hướng đến việc xây dựng mô hình dự đoán kết quả học tập của người dùng cuối cho các nền dữ liệu hành vi học tập trên các nền tảng MOOCs. Hệ thống sẽ sinh thời điểm cảnh báo, lý do, tình trạng học tập hiện tại, dự đoán kết quả có thể đạt được, đồng thời đề xuất các giải pháp khắc phục cụ thể, chính xác và nguy cơ không hoàn thành khoá học.
                </p>
                <p className="mt-2 text-gray-600">
                  Đề tài đưa ra giải pháp cảnh báo sớm với nhiều giá trị thiết thực trong đào tạo trực tuyến đối với người học, hệ thống đồng vải với môi công cụ hỗ trợ theo dõi và đánh giá quá trình học tập, hoạ vào cảnh báo sớm, sinh viên có thể điều chỉnh phương pháp và thời gian biểu, từ đó nâng cao kết quả học tập của khoá học và phát triển kỹ năng tự học.
                </p>
                <p className="mt-2 text-gray-600">
                  Với giảng viên và nhà quản lý, hệ thống giúy có nhận biết học viên có nguy cơ khó hoàn thành khoá học, từ đó đưa ra các biện pháp hỗ trợ phù hợp như tư vấn cá nhân, tổ chức ôn tập hoặc điều chỉnh nội dung giảng dạy. Ngoài ra, dự liệu từ hệ thống còn giúp đánh giá chất lượng tài liệu học tập, đánh giá số ca tiềm năng cần hỗ trợ và tối ưu hoá đồng giảng dạy.
                </p>
              </div>
            )}
            
            {activeTab === 'innovation' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Tính mới & Cấp thiết</h3>
                <p className="mt-2 text-gray-600">
                  Ứng dụng hai mô hình mạng neural Stack-LSTM và mạng Fully Connected Neural Network (FCNN) vào dự đoán kết quả học tập.
                </p>
                <p className="mt-2 text-gray-600">
                  Phân tích hành vi học tập chi tiết theo chuỗi thời gian thay vì chỉ dựa vào điểm số.
                </p>
                <p className="mt-2 text-gray-600">
                  Áp dụng các thuật toán như Random Forest và LightGBM để tăng độ chính xác.
                </p>
                <p className="mt-2 text-gray-600">
                  Hệ thống cảnh báo sớm thông qua trực tiếp đến học viên, mài phi hiện thủ chũ mã quản lý để đảm bảo tính chủ động và toàn diện trong hỗ trợ học tập.
                </p>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Data Sources</h3>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                    View Data
                  </button>
                </div>
                <p className="mt-4 text-gray-600">
                  Trong nghiên cứu này, nhóm sử dụng bộ dữ liệu MOOCCubeX, một tập dữ liệu quy mô lớn được phát triển bởi Nhóm Kỹ thuật Trí thức của Đại học Thanh Hoa, thu thập từ nền tảng học trực tuyến XuetangX. Bộ dữ liệu này được thiết kế chuyên biệt cho các nghiên cứu liên quan đến hành vi học tập trong môi trường MOOC (Massive Open Online Courses), với phạm vi bao phủ rộng, cấu trúc rõ ràng và tổ chức theo các khái niệm chi tiết.
                </p>
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-2">Dataset Features:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>User interaction data</li>
                    <li>Course structure information</li>
                    <li>Academic performance indicators</li>
                    <li>Behavioral patterns</li>
                    <li>Temporal information</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Preview</h2>
          </div>
          <div className="p-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs ml-2">MOOC Learning Analytics Dashboard</span>
                </div>
              </div>
              <div className="bg-gray-900 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-cyan-400 text-sm font-medium mb-2">Students at Risk</h3>
                    <div className="text-3xl text-white font-bold">24%</div>
                    <div className="mt-2 text-xs text-red-400">↑ 3% from last week</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-cyan-400 text-sm font-medium mb-2">Avg. Completion</h3>
                    <div className="text-3xl text-white font-bold">67%</div>
                    <div className="mt-2 text-xs text-green-400">↑ 5% from last week</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-cyan-400 text-sm font-medium mb-2">Active Students</h3>
                    <div className="text-3xl text-white font-bold">428</div>
                    <div className="mt-2 text-xs text-yellow-400">↓ 2% from last week</div>
                  </div>
                </div>
                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-cyan-400 text-sm font-medium mb-4">Performance Prediction Trends</h3>
                  <div className="h-40 flex items-end space-x-2">
                    {[35, 42, 58, 63, 72, 80, 65, 72, 84, 86, 76, 80].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t" 
                          style={{ height: `${value}%` }}
                        ></div>
                        <div className="text-xs text-gray-400 mt-1">{index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 MOOC Learning Analytics Project. Trường Đại học Công nghệ thông tin - Khoa CS
          </p>
        </div>
      </footer>
    </div>
  );
}
