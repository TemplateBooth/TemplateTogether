import re
from bs4 import BeautifulSoup

with open('test.html') as HTML:
    soup = BeautifulSoup(HTML, "lxml")
# print(soup.prettify())

# print(list(soup.children))
# for child in list(soup.children):
#     print(child)

all_img = soup.find_all('img')
for img in all_img:

    print(img.get('src'))

# Image url from inline style
for div in soup.find_all('div'):
    # for child in div.children:
    #     # style = child
    #     # urls = re.findall('url\((.*?)\)', style)
    #     print(child)

    style = div.get('style')
    urls = re.findall('url\((.*?)\)', style)

    if urls is not None:
        print(urls)
    # if bg is not none:
    #     img_url = bg.re
# print(all_bg_img)
div = soup.find('div', style='background-url:%')

print(div)
