import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@/context/ThemeContext";

const FeatureHeatMap = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const variables = [
    "delivery_days", "days_for_shipment", "sales", "order_item_quantity",
    "order_item_discount", "order_item_discount_rate", "order_item_profit_ratio",
    "order_item_total", "order_item_product_price", "order_item_profit_amount"
  ];

  const correlationMatrix = {
    "delivery_days": {
      "delivery_days": 1, "days_for_shipment": 0.8368, "sales": 0.1199, "order_item_quantity": 0.0943,
      "order_item_discount": 0.1103, "order_item_discount_rate": 0.1103, "order_item_profit_ratio": -0.0157,
      "order_item_total": 0.1199, "order_item_product_price": 0.0624, "order_item_profit_amount": 0.1139
    },
    "days_for_shipment": {
      "delivery_days": 0.8368, "days_for_shipment": 1, "sales": 0.0931, "order_item_quantity": 0.0915,
      "order_item_discount": 0.0863, "order_item_discount_rate": 0.0863, "order_item_profit_ratio": -0.0368,
      "order_item_total": 0.0931, "order_item_product_price": 0.0274, "order_item_profit_amount": 0.0816
    },
    "sales": {
      "delivery_days": 0.1199, "days_for_shipment": 0.0931, "sales": 1, "order_item_quantity": 0.5839,
      "order_item_discount": 0.2488, "order_item_discount_rate": 0.2488, "order_item_profit_ratio": -0.0258,
      "order_item_total": 1, "order_item_product_price": 0.9292, "order_item_profit_amount": 0.335
    },
    "order_item_quantity": {
      "delivery_days": 0.0943, "days_for_shipment": 0.0915, "sales": 0.5839, "order_item_quantity": 1,
      "order_item_discount": 0.1083, "order_item_discount_rate": 0.1083, "order_item_profit_ratio": 0.0335,
      "order_item_total": 0.5839, "order_item_product_price": 0.2835, "order_item_profit_amount": 0.1942
    },
    "order_item_discount": {
      "delivery_days": 0.1103, "days_for_shipment": 0.0863, "sales": 0.2488, "order_item_quantity": 0.1083,
      "order_item_discount": 1, "order_item_discount_rate": 1, "order_item_profit_ratio": -0.2803,
      "order_item_total": 0.2488, "order_item_product_price": 0.0897, "order_item_profit_amount": 0.1546
    },
    "order_item_discount_rate": {
      "delivery_days": 0.1103, "days_for_shipment": 0.0863, "sales": 0.2488, "order_item_quantity": 0.1083,
      "order_item_discount": 1, "order_item_discount_rate": 1, "order_item_profit_ratio": -0.2803,
      "order_item_total": 0.2488, "order_item_product_price": 0.0897, "order_item_profit_amount": 0.1546
    },
    "order_item_profit_ratio": {
      "delivery_days": -0.0157, "days_for_shipment": -0.0368, "sales": -0.0258, "order_item_quantity": 0.0335,
      "order_item_discount": -0.2803, "order_item_discount_rate": -0.2803, "order_item_profit_ratio": 1,
      "order_item_total": -0.0258, "order_item_product_price": -0.1766, "order_item_profit_amount": 0.6043
    },
    "order_item_total": {
      "delivery_days": 0.1199, "days_for_shipment": 0.0931, "sales": 1, "order_item_quantity": 0.5839,
      "order_item_discount": 0.2488, "order_item_discount_rate": 0.2488, "order_item_profit_ratio": -0.0258,
      "order_item_total": 1, "order_item_product_price": 0.9292, "order_item_profit_amount": 0.335
    },
    "order_item_product_price": {
      "delivery_days": 0.0624, "days_for_shipment": 0.0274, "sales": 0.9292, "order_item_quantity": 0.2835,
      "order_item_discount": 0.0897, "order_item_discount_rate": 0.0897, "order_item_profit_ratio": -0.1766,
      "order_item_total": 0.9292, "order_item_product_price": 1, "order_item_profit_amount": 0.1722
    },
    "order_item_profit_amount": {
      "delivery_days": 0.1139, "days_for_shipment": 0.0816, "sales": 0.335, "order_item_quantity": 0.1942,
      "order_item_discount": 0.1546, "order_item_discount_rate": 0.1546, "order_item_profit_ratio": 0.6043,
      "order_item_total": 0.335, "order_item_product_price": 0.1722, "order_item_profit_amount": 1
    }
  };

  const series = variables.map((rowVar) => ({
    name: rowVar,
    data: variables.map((colVar) => ({
      x: colVar,
      y: parseFloat(correlationMatrix[rowVar]?.[colVar] || 0)
    }))
  }));

  const options = {
    chart: {
      height: 600,
      type: "heatmap",
      foreColor: isDark ? "#f5f5f5" : "#333"
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [isDark ? "#fff" : "#000"]
      }
    },
    colors: ["#00A100", "#128FD9", "#FFB200", "#FF4560"], // Gradient color based on value
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: -1, to: -0.5, name: 'Strong Negative', color: '#d9534f' },
            { from: -0.5, to: 0, name: 'Weak Negative', color: '#f0ad4e' },
            { from: 0, to: 0.5, name: 'Weak Positive', color: '#5bc0de' },
            { from: 0.5, to: 1, name: 'Strong Positive', color: '#5cb85c' }
          ]
        }
      }
    },
    title: {
      text: "Correlation Heatmap",
      style: {
        color: isDark ? "#f0f0f0" : "#111"
      }
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: isDark ? "#ccc" : "#333"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#ccc" : "#333"
        }
      }
    },
    tooltip: {
      theme: isDark ? "dark" : "light"
    }
  };

  return (
      <Chart options={options} series={series} type="heatmap" height={600} />
  );
};

export default FeatureHeatMap;
