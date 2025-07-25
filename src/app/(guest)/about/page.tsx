"use client";
import Head from "next/head";
import { useState } from "react";
import {
  Users,
  Info,
  Clipboard,
  Zap,
  FileText,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

import React from "react";
import Link from "next/link";

// ✅ Card Component Types
type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};


// ✅ StatCard Component Types
type StatCardProps = {
  title: string;
  value: string | number;
  trend: "up" | "down" | "flat";
  trendValue: string;
  icon: React.ReactNode;
  color: string; // ví dụ: 'border-cyan-500'
};

const StatCard = ({
  title,
  value,
  trend,
  trendValue,
  icon,
  color,
}: StatCardProps) => (
  <div
    className={`bg-gray-800 p-5 rounded-xl border-l-4 ${color} transition-transform duration-300 hover:scale-[1.02]`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-cyan-400 text-sm font-medium mb-2">{title}</h3>
        <div className="text-3xl text-white font-bold">{value}</div>
        <div
          className={`mt-2 text-xs ${
            trend === "up"
              ? "text-green-400"
              : trend === "down"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}{" "}
          from last week
        </div>
      </div>
      <div className="p-3 rounded-full bg-gray-700">{icon}</div>
    </div>
  </div>
);

// ✅ TeamMember Component Types
type TeamMemberProps = {
  name: string;
  id: string;
  classInfo: string;
  avatar: React.ReactNode;
};

const TeamMember = ({ name, id, classInfo, avatar }: TeamMemberProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center space-x-4 p-4 rounded-xl transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-50 hover:bg-cyan-50 text-gray-900'}`}>
      <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl text-white shadow-md">
        {avatar}
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-400">{id}</p>
        <p className="text-sm text-gray-400">{classInfo}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const teamMembers = [
      {
      name: "Đặng Thanh Ngân",
      id: "22521072",
      class: "Trưởng nhóm",
      avatar: "🦊",
    },
    {
      name: "Nguyễn Hồng Phát",
      id: "22521072",
      class: "Thư kí",
      avatar: "🐱",
    },
    {
      name: "Phạm Thanh Thảo",
      id: "22521072",
      class: "Thành viên",
      avatar: "🐈",
    },
    {
      name: "Lê Dương Minh Thiên",
      id: "22521072",
      class: "Thành viên",
      avatar: "🐕",
    },

    {
      name: "Đinh Hữu Phước",
      id: "22521072",
      class: "Thành viên",
      avatar: "🐱",
    },
  ];

  const tabs = [
    { id: "overview", name: "Tổng quan", icon: <Info className="w-4 h-4" /> },
    {
      id: "application",
      name: "Ứng dụng",
      icon: <Clipboard className="w-4 h-4" />,
    },
    { id: "innovation", name: "Tính mới", icon: <Zap className="w-4 h-4" /> },
    { id: "data", name: "Bộ dữ liệu", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      <Head>
        <title>Phân tích bộ dữ liệu MOOC</title>
        <meta
          name="description"
          content="Predicting online learners' academic performance on MOOCs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={`${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-sm sticky top-0 z-10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-700 text-transparent bg-clip-text">
                Learning Analytics Platform
              </span>
            </h1>
            <nav className="hidden md:flex space-x-4">
              {["Dashboard", "Analytics", "Reports", "Settings"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Title Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl shadow-lg mb-8 text-white p-10 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">ĐỀ TÀI</h2>
            <h3 className="text-3xl mb-6 font-bold">
              Dự đoán sớm kết quả học tập của học viên trong các khóa học MOOC bằng trích xuất đặc trưng quan hệ trên đồ thị
            </h3>
            <p className="text-xl">
              Early Prediction of Student Performance in MOOCs Using Graph-Based Relational Feature Enrichment
            </p>
          </div>
        </div>

        {/* Project Team Section */}
        <Card className="mb-8">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h2
              className={`text-xl font-semibold ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <Users className="w-5 h-5 mr-2 text-cyan-600" />
              Nhóm thực hiện
            </h2>
            <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              5 Thành viên
            </span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  id={member.id}
                  classInfo={member.class}
                  avatar={member.avatar}
                />
              ))}
            </div>
            <div className="mt-8 text-center p-4 bg-gradient-to-r from-gray-50 to-cyan-50 rounded-xl">
              <p className="text-sm text-gray-700">
                Trường Đại học Công nghệ thông tin - Khoa Khoa học máy tính
              </p>
            </div>
          </div>
        </Card>

        {/* Project Details Section */}
        <Card className="mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2
              className={`text-xl font-semibold ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Thông tin về dự án
            </h2>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? isDark
                        ? "border-cyan-500 text-cyan-400"
                        : "border-cyan-500 text-cyan-600"
                      : isDark
                      ? "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {[
                  {
                    icon: (
                      <Info
                        className={`w-6 h-6 ${
                          isDark ? "text-cyan-400" : "text-cyan-500"
                        }`}
                      />
                    ),
                    title: "Mục tiêu",
                    content:
                      "Trong bối cảnh giáo dục trực tuyến phát triển mạnh mẽ, MOOCs trở thành lựa chọn học tập phổ biến với tính linh hoạt và khả năng tiếp cận rộng rãi. Tuy nhiên, tỷ lệ hoàn thành khoá học thấp và sự thiếu hụt hỗ trợ cá nhân hoá vẫn là thách thức lớn. Phần lớn học viên không đủ kết quả do thiếu động lực, phương pháp học chưa phù hợp hoặc không được hướng dẫn kịp thời.",
                  },
                  {
                    icon: (
                      <Clipboard
                        className={`w-6 h-6 ${
                          isDark ? "text-cyan-400" : "text-cyan-500"
                        }`}
                      />
                    ),
                    title: "Khả năng",
                    content:
                      "Về mặt học thuật, việc phân loại kết quả học tập theo 5 mức độ dài hơi mà hình học may xử lý đồ thị phức tạp từ nhiều nguồn, đảm bảo độ chính xác và khả năng khái quát trong môi trường học tập đa dạng.",
                  },
                  {
                    icon: (
                      <Zap
                        className={`w-6 h-6 ${
                          isDark ? "text-cyan-400" : "text-cyan-500"
                        }`}
                      />
                    ),
                    title: "Ý nghĩa",
                    content:
                      'Đề tài "Dự đoán kết quả học tập và cảnh báo sớm trên nền tảng MOOCs" hướng đến sự nghiên cứu sâu sắc về khả năng dự đoán và phân loại kết quả học tập của học viên trên các nền tảng MOOCs, từ đó cung cấp hệ thống cảnh báo sớm.',
                  },
                ].map((section, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div
                      className={`${
                        isDark ? "bg-cyan-900" : "bg-cyan-100"
                      } rounded-full p-3 flex-shrink-0`}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-medium ${
                          isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {section.title}
                      </h3>
                      <p
                        className={`mt-2 leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "application" && (
              <div className="space-y-6">
                <h3
                  className={`text-lg font-medium flex items-center ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  <Clipboard
                    className={`w-5 h-5 mr-2 ${
                      isDark ? "text-cyan-400" : "text-cyan-500"
                    }`}
                  />
                  Ứng dụng
                </h3>

                <div
                  className={`p-6 rounded-xl ${
                    isDark
                      ? "bg-gradient-to-r from-gray-800 to-cyan-950"
                      : "bg-gradient-to-r from-gray-50 to-cyan-50"
                  }`}
                >
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    Đề tài hướng đến việc xây dựng mô hình dự đoán kết quả học
                    tập của người dùng cuối cho các nền dữ liệu hành vi học tập
                    trên các nền tảng MOOCs. Hệ thống sẽ sinh thời điểm cảnh
                    báo, lý do, tình trạng học tập hiện tại, dự đoán kết quả có
                    thể đạt được, đồng thời đề xuất các giải pháp khắc phục cụ
                    thể, chính xác và nguy cơ không hoàn thành khoá học.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {[
                    {
                      title: "Đối với người học",
                      content:
                        "Đề tài đưa ra giải pháp cảnh báo sớm với nhiều giá trị thiết thực trong đào tạo trực tuyến đối với người học, hệ thống đồng vải với môi công cụ hỗ trợ theo dõi và đánh giá quá trình học tập, hoạ vào cảnh báo sớm, sinh viên có thể điều chỉnh phương pháp và thời gian biểu, từ đó nâng cao kết quả học tập của khoá học và phát triển kỹ năng tự học.",
                    },
                    {
                      title: "Đối với giảng viên",
                      content:
                        "Với giảng viên và nhà quản lý, hệ thống giúy có nhận biết học viên có nguy cơ khó hoàn thành khoá học, từ đó đưa ra các biện pháp hỗ trợ phù hợp như tư vấn cá nhân, tổ chức ôn tập hoặc điều chỉnh nội dung giảng dạy. Ngoài ra, dự liệu từ hệ thống còn giúp đánh giá chất lượng tài liệu học tập, đánh giá số ca tiềm năng cần hỗ trợ và tối ưu hoá đồng giảng dạy.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl shadow-sm border ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <h4
                        className={`font-medium mb-3 ${
                          isDark ? "text-cyan-400" : "text-cyan-700"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "innovation" && (
              <div>
                <h3
                  className={`text-lg font-medium flex items-center mb-6 ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  <Zap
                    className={`w-5 h-5 mr-2 ${
                      isDark ? "text-cyan-400" : "text-cyan-500"
                    }`}
                  />
                  Tính mới & Cấp thiết
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Mô hình mạng neural tiên tiến",
                      description:
                        "Ứng dụng hai mô hình mạng neural Stack-LSTM và mạng Fully Connected Neural Network (FCNN) vào dự đoán kết quả học tập.",
                    },
                    {
                      title: "Phân tích hành vi theo thời gian",
                      description:
                        "Phân tích hành vi học tập chi tiết theo chuỗi thời gian thay vì chỉ dựa vào điểm số.",
                    },
                    {
                      title: "Thuật toán Machine Learning hiện đại",
                      description:
                        "Áp dụng các thuật toán như Random Forest và LightGBM để tăng độ chính xác.",
                    },
                    {
                      title: "Hệ thống cảnh báo chủ động",
                      description:
                        "Hệ thống cảnh báo sớm thông qua trực tiếp đến học viên, mà không cần hiện thủ công từ phía quản lý, nhằm đảm bảo tính chủ động và toàn diện trong hỗ trợ học tập.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <h4
                        className={`font-medium mb-2 ${
                          isDark ? "text-cyan-400" : "text-cyan-700"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={
                          isDark
                            ? "text-gray-300 text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-lg font-medium flex items-center ${
                      isDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    <FileText
                      className={`w-5 h-5 mr-2 ${
                        isDark ? "text-cyan-400" : "text-cyan-500"
                      }`}
                    />
                    Data Sources
                  </h3>
                  <Link href = "https://github.com/THU-KEG/MOOCCubeX">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm transition-all">
                      View Data
                    </button>
                  </Link>
                </div>

                <div
                  className={`p-6 rounded-xl mb-6 ${
                    isDark
                      ? "bg-gradient-to-r from-gray-800 to-cyan-950"
                      : "bg-gradient-to-r from-gray-50 to-cyan-50"
                  }`}
                >
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    Trong nghiên cứu này, nhóm sử dụng bộ dữ liệu MOOCCubeX, một
                    tập dữ liệu quy mô lớn được phát triển bởi Nhóm Kỹ thuật Trí
                    thức của Đại học Thanh Hoa, thu thập từ nền tảng học trực
                    tuyến XuetangX. Bộ dữ liệu này được thiết kế chuyên biệt cho
                    các nghiên cứu liên quan đến hành vi học tập trong môi
                    trường MOOC (Massive Open Online Courses), với phạm vi bao
                    phủ rộng, cấu trúc rõ ràng và tổ chức theo các khái niệm chi
                    tiết.
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl border shadow-sm ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <h4
                    className={`font-medium mb-4 ${
                      isDark ? "text-cyan-400" : "text-cyan-700"
                    }`}
                  >
                    Dataset Features:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "User interaction data",
                      "Course structure information",
                      "Academic performance indicators",
                      "Behavioral patterns",
                      "Temporal information",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          isDark ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                        <span
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
 
      </main>

      <footer
        className={`border-t mt-12 ${
          isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-6 mb-4">
              {[
                {
                  icon: (
                    <Info
                      className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  ),
                  label: "Giới thiệu",
                },
                {
                  icon: (
                    <Users
                      className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  ),
                  label: "Nhóm",
                },
                {
                  icon: (
                    <FileText
                      className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  ),
                  label: "Tài liệu",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center space-x-1 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-500 hover:text-cyan-600"
                  } transition-colors`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>
            <p
              className={`text-center text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              © 2025 MOOC Learning Analytics Project. Trường Đại học Công nghệ
              thông tin - Khoa CS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
