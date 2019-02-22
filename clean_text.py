#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb 22 10:57:45 2019

@author: kiraliang
"""

import json
import re
from nltk import word_tokenize
from nltk.corpus import stopwords
import string

input_file = './InformationRetrieval/Reed.co.uk 1000 listings.json'
output_file = './InformationRetrieval/indeed_1063_listing_clean.json'

with open(input_file) as f:
    data = json.load(f)
    
def lowercase_strip(senctence):
    '''
    strip all the non-alphabetical characters
    '''
    if isinstance(senctence, (list,)):
        senctence = ' '.join(senctence).replace('\r', '').replace('\n', '')
    elif isinstance(senctence, (str,)):
        clean_text = senctence.strip().lower()
        result = re.sub(r"[^a-zA-Z]+", ' ', clean_text)
        return result
    else:
        return ''
    
STOPWORD = stopwords.words('english') + list(string.punctuation)
def clean_discription(descrip_list):
    if isinstance(descrip_list, (list,)):
        descrip_list = ' '.join(descrip_list).replace('\r', '').replace('\n', '').strip()
    clean_descrip =' '.join([i for i in word_tokenize(descrip_list.lower()) if i not in STOPWORD])
    return clean_descrip

for i in data:
    location_clean = lowercase_strip(i['location'])
    d1 = {'location': location_clean}
    company_clean = lowercase_strip(i['company'])
    d2 = {'company': company_clean}
    title_clean = lowercase_strip(i['title'])
    d3 = {'title': title_clean}
    descrip_clean = clean_discription(i['description'])
    d4 = {'description': descrip_clean}
    i.update(d1)
    i.update(d2)
    i.update(d3)
    i.update(d4)
    
with open(output_file, 'w') as f:
    json.dump(data, f)