import re

htmlFile = open("onefixed.html", "r")
# cssFile = open("css/onefixed.css", 'r')

# changedHtmlFile = open("home.html", 'w')
# changedCssFile = open("changedFolder/css/onefixed.css", 'w')


color_variables = {}
total_colors = 0

data = htmlFile.read()
i = 0
elements = data.split('>')
# print(elements)

newHtml = ''
for element in elements:
    words = element.split('"')
    j = 0
    # print(words)
    while j < len(words):
        word = words[j]
        if word.replace(' ', '')[-6:] == 'style=':
            text = words[j+1]
            values = text.split(';')
            sampleText = word + '"'
            for value in values:
                current = value.split(':')
                print(current)
                if len(current) == 2:
                    current = current[1]
                    current = current.strip()
                    # print(current)
                    colors = re.findall('#(?:[0-9A-Fa-f]{3}){1,2}|rgba\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*[01]?.?[0-9]?\s*\)|rgb\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*\)', current)
                    print(colors)
                    for color in colors:
                        if color not in color_variables:
                            total_colors = total_colors + 1
                            value = value.replace(color, "var(--color_" +
                                                  str(total_colors) + ')')
                            color_variables[color] = "--color_" + \
                                str(total_colors)
                        else:
                            value = value.replace(
                                color, "var(" + color_variables[color] + ")")
                    sampleText += value + ";"

            newHtml += sampleText + '"'
            j = j+2
        else:
            newHtml += word
            j = j+1
            word = word.replace(" ", "")
            if len(words) != 1 and word != '/' and word != '\n/' and word != '\n' and word != '':  # appending "
                newHtml += '"'

    i = i+1

    newHtml += '>'


# print(newHtml)


colorValues = {
    'black': 0,
    'white': 1,
}

old_variables = {}

# data = cssFile.read()
# elements = data.split('}')
# newCss = ''
# for element in elements:
#     words = element.split(';')
#     sampleText = ''
#     # print(words)
#     for value in words:
#         current = value.split(':')
#         if len(current) >= 2:
#             last = current[-1]
#             last = last.strip()
#             # print(current)

#             variable_list = current[-2]
#             variable = variable_list.split(' ')[-1]
#             # print(variable)
#             if re.search('^--[a-zA-Z0-9]*', variable):
#                 if last in color_variables:
#                     print(last, color_variables[last])
#                     # remove statement
#                     old_variables['var(' + variable + ')'] = 'var(' + \
#                         color_variables[last] + ')'
#                 else:
#                     total_colors = total_colors + 1
#                     color_variables[last] = "--color_" + \
#                         str(total_colors)
#                     old_variables['var(' + variable + ')'] = 'var(' + \
#                         color_variables[last] + ')'

#                 text_from_startof_selector = ':'.join(current[:-1])
#                 if len(variable_list.split(' ')) > 1:
#                     sampleText += text_from_startof_selector.replace(
#                         variable, '')

#             else:
#                 colors = re.findall('#(?:[0-9A-Fa-f]{3}){1,2}|rgba\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*[01]?.?[0-9]?\s*\)|rgb\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*\)|var\(--[a-zA-Z0-9]*\)', last)
#                 # print(colors)
#                 texts = last.split(' ')  # alphabet colors
#                 for text in texts:
#                     if text in colorValues:
#                         colors.append(text)

#                 for color in colors:
#                     # for var(--dfhd) in styles
#                     if re.search('var', color):
#                         print(color)
#                         value = value.replace(color, old_variables[color])

#                     else:
#                         if color not in color_variables:
#                             total_colors = total_colors + 1
#                             value = value.replace(color, "var(--color_" +
#                                                   str(total_colors) + ')')
#                             color_variables[color] = "--color_" + \
#                                 str(total_colors)
#                         else:
#                             value = value.replace(
#                                 color, "var(" + color_variables[color] + ")")
#                 sampleText += value + ";"

#         else:
#             sampleText += value

#     newCss += sampleText + "}"


# print(old_variables)
# rootCss = ":root{\n"

# for variable in color_variables:
#     rootCss += color_variables[variable] + ':' + variable + ';\n'

# rootCss += '\n}'

# newCss = rootCss + newCss

# print(newCss)


# changedHtmlFile.write(newHtml)
# changedCssFile.write(newCss)
