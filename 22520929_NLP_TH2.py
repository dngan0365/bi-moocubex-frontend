import math
import nltk
import re
import random
import numpy as np
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import classification_report

# Tải tài nguyên một lần
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Dùng lại các đối tượng
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

import pandas as pd

def read_hate_speech_file(filepath):
    rows = []
    with open(filepath, 'r', encoding='utf-8') as file:
        for line in file:
            if '\t' in line:
                content, label = line.rsplit('\t', 1)
                content = content.strip('` ').strip()
                try:
                    label = int(label.strip())
                    rows.append((content, label))
                except ValueError:
                    continue  # Skip malformed lines

    return pd.DataFrame(rows, columns=["text", "label"])


def preprocess_text(text):
    text = str(text)
    text = text.lower()
    text = text.replace("\n", " ")  # Loại bỏ ký tự xuống dòng
    text = re.sub(r"http\S+|www\S+|https\S+", '', text)  # Loại bỏ URL
    text = re.sub(r'[^\x00-\x7F]+', '', text)  # Loại bỏ emoji và ký tự unicode đặc biệt
    text = re.sub(r'\d+', '', text)  # ✅ Loại bỏ số
    text = re.sub(r'[^\w\s]', '', text)  # Loại bỏ ký tự đặc biệt (!@#...)
    text = re.sub(r'\s+', ' ', text).strip()  # Loại bỏ khoảng trắng thừa
    tokens = word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word.isalpha() and word not in stop_words]
    return tokens

def feature(train, test):
    # Khởi tạo vectorizer
    vectorizer = TfidfVectorizer(
        min_df=2,
        max_df=0.9,
        max_features=500,
        stop_words='english'
    )

    # Fit trên dữ liệu train
    X_train = vectorizer.fit_transform(train)

    # Transform dữ liệu test (không fit lại!)
    X_test = vectorizer.transform(test)

    # Lấy danh sách từ/ngram
    vocab = vectorizer.get_feature_names_out()
    # print(f"Số lượng đặc trưng: {len(vocab)}")
    # print(f"Ví dụ từ/ngram: {vocab[:10]}")

    # Ghi ra file
    with open('feat.txt', 'w', encoding='utf-8') as f:
        for term in vocab:
            f.write(term + '\n')

    return X_train, X_test    


def run(test):
    df = read_hate_speech_file("data.txt")
    train = list(df["text"])
    label = list(df["label"])
    
    # Tiền xử lý dữ liệu
    test = [' '.join(preprocess_text(t)) for t in test]
    train_proc = [' '.join(preprocess_text(t)) for t in train]

    # Tìm đặc trưng
    X_train, X_test = feature(train_proc, test)
    y_train = np.array(label, dtype=int)

    # Chuyển TF-IDF thành nhị phân
    X_train_bin = (X_train > 0).astype(int)
    X_test_bin = (X_test > 0).astype(int)

    # Khởi tạo và huấn luyện mô hình BernoulliNB
    model = BernoulliNB(alpha=0.1)
    model.fit(X_train_bin, y_train)

    # Dự đoán
    y_pred = model.predict(X_test_bin)
    # y_pred_train = model.predict(X_train_bin)
    
    # Nếu có nhãn thật, in báo cáo
    # if y_pred_train is not None:
    #     print("\n📊 Classification Report:")
    #     print(classification_report(y_train, y_pred_train))
    

    # Ghi dự đoán ra file
    with open('pred.txt', 'w', encoding='utf-8') as f:
        for l in y_pred:
            f.write(str(l) + '\n')
            
    return list(y_pred)
