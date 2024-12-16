import pandas as pd

def preprocess_data(file_path):
    df = pd.read_csv(file_path)
    df.fillna(0, inplace=True)
    return df

if __name__ == "__main__":
    df = preprocess_data("sample_data.csv")
    print("Data preprocessed:", df.head())
