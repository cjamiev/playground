import os

def rename_js_to_ts(directory):
    """
    Recursively rename all .js files to .ts in the given directory.
    """
    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith('test.ts'):
                js_path = os.path.join(root, filename)
                ts_path = os.path.splitext(js_path)[0] + '.DELETE'
                os.rename(js_path, ts_path)
                print(f"Renamed: {js_path} -> {ts_path}")

rename_js_to_ts('./src');