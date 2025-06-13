import os
import pandas as pd
import random
import requests
import math
from tqdm import tqdm


slugs = ['terms-and-conditions',
        'privacy-policy',
        'disclaimer',
        'shipping-policy',
        'refund-policy',
        'payment-terms-and-special-fees']


def getClientInformation(row_index):
    excel = pd.read_excel('C:\\Users\\User\\Desktop\\playwright\\tos\\utils\\App Metadata Table.xlsx')
    row = excel.loc[row_index]
    if pd.isna(row['Backend Test URL']):
        print('empty api url')
        return None
    if pd.isna(row['Live Customer URL']):
        print('empty customer url')
        return None
    return row


def getTemplates(language, slug):
    excel = pd.read_excel(f'C:\\Users\\User\\Desktop\\playwright\\tos\\utils\\templates\\{language}.xlsx')
    content = excel[slug].dropna().tolist()
    return content


def replaceVariables(html, company_full_name, company_short_name, website_url):
    return html.replace('COMPANY_FULL_NAME', company_full_name).replace('COMPANY_SHORT_NAME', company_short_name).replace('WEBSITE_URL', website_url)


def login(base_url):
    body = {
        'type': 'EMAIL',
        'login_id': 'su@starsnet.com.hk',
        'password': 'Password12345'
    }
    res = requests.post(f'{base_url}/auth/login', json=body).json()
    return f"Bearer {res['token']}"


def getContentBySlug(base_url, token, slug):
    return requests.get(f'{base_url}/contents/slug/{slug}/details', headers={'Authorization': token}).json()


def updateContentBySlug(base_url, token, slug, body):
    return requests.post(f'{base_url}/contents/slug/{slug}/details', json=body, headers={'Authorization': token}).json()


def main():
    for idx in range(24):
        client = getClientInformation(idx)
        if client is None:
            continue
        base_url = f"https://{client['Backend Test URL']}/api/admin"
        # base_url = f"https://backend.test.starsnet.hk/api/admin"
        company_full_name = client['Merchant Name']
        company_short_name = client['App Name']
        website_url = client['Live Customer URL']
        token = login(base_url)
        for slug in tqdm(slugs, desc=company_short_name):
            content = getContentBySlug(base_url, token, slug)
            index = random.randrange(len(getTemplates('en', slug)))
            en_template = getTemplates('en', slug)[index]
            zh_template = getTemplates('zh', slug)[index]
            cn_template = getTemplates('cn', slug)[index]
            replaced_en = replaceVariables(en_template, company_full_name, company_short_name, website_url)
            replaced_zh = replaceVariables(zh_template, company_full_name, company_short_name, website_url)
            replaced_cn = replaceVariables(cn_template, company_full_name, company_short_name, website_url)
            if slug == 'terms-and-conditions':
                content['content']['title']['en'] = 'Terms & Conditions'
            content['content']['info'] = {'en': replaced_en, 'zh': replaced_zh, 'cn': replaced_cn}
            updateContentBySlug(base_url, token, slug, content)


if __name__ == '__main__':
    main()
