import os
import shutil

# === Configuration ===
source_folder = r'C:\\path\\to\\source'          # Folder with files to move
destination_folder = r'C:\\path\\to\\destination'  # Folder to move files into
new_base_name = 'renamed_file_'               # Base name for renamed files

# === Create destination folder if it doesn't exist ===
os.makedirs(destination_folder, exist_ok=True)

# === List all files in source folder ===
files = [f for f in os.listdir(source_folder) if os.path.isfile(os.path.join(source_folder, f))]

# === Move and rename files ===
for index, filename in enumerate(files, start=1):
    file_ext = os.path.splitext(filename)[1]  # Keep original file extension
    new_name = f"{new_base_name}{file_ext}"
    
    src_path = os.path.join(source_folder, filename)
    dst_path = os.path.join(destination_folder, new_name)

    shutil.move(src_path, dst_path)
    print(f"Moved: {src_path} → {dst_path}")

print("✅ All files moved and renamed.")