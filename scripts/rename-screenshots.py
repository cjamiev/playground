#!/usr/bin/env python
from os import rename, listdir, path

fnames = listdir('')
currentdir = ''

for idx, fname in enumerate(fnames):
    old_file = path.join(currentdir, fname)
    if fname.find('.png') != -1:
        new_file = path.join(currentdir, 'other' + str(idx+1) + '.png')
    else:
        new_file = path.join(currentdir, 'other' + str(idx+1) + '.JPEG')
    print(new_file)
    rename(old_file, new_file)
