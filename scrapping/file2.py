import re

jsFile = open("typing.js", "r")


fixedStyling = {
	'color': 0,
	'backgroundColor': 0,
	'boxShadow': 0,
	'background': 0,
	'borderColor': 0,
	'borderBottomColor': 0,
	'borderLeftColor': 0,
	'borderRightColor': 0,
	'borderTopColor': 0,
	'columnRuleColor': 0,
	'outlineColor': 0,
	'textDecorationColor': 0
}
colorValues = {
    'black': 0,
    'white': 1,
	'blue': 2,
}

data = jsFile.read()

elements = re.split('"|`|\'',data)
# print(elements)
newjs = ''
color_variables = {}
total_colors = 0
j = 0
while j < len(elements):

	element = elements[j]
	# print(element)
	if element.replace(' ', '')[-6:] == 'style=':
		text = elements[j+1]
		properties = text.split(';')
		# print(properties)
		insideJS = element + '"'
		# afterComma = ''
		for property in properties:
			current = property.split(':')
			if len(current) == 2:
				mixColor = current[1]
				colors = re.findall('var\(--[a-zA-Z0-9]*\)|#(?:[0-9A-Fa-f]{3}){1,2}|rgba\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*[01]?.?[0-9]?\s*\)|rgb\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*\)', mixColor)
				values = mixColor.split(' ')
				for value in values:
					if value in colorValues.keys():
						colors.append(value)
						
				# print(value)
				for color in colors:
					if color not in color_variables:
						total_colors = total_colors + 1
						property = property.replace(color, "var(--color_" + str(total_colors) + ')')
						color_variables[color] = "--color_" + \
							str(total_colors)
					else:
						property = property.replace(color, "var(" + color_variables[color] + ")")
				# print(property)
				
				insideJS += property + ';'

		newjs += insideJS + '"'
		j = j + 2
		# print(newjs)
	else :
		flag = 0
		for key in fixedStyling:
			if key in element:
				flag = 1
		if flag == 1:
			insideJS = element + '"'
			colors = re.findall('var\(--[a-zA-Z0-9]*\)|#(?:[0-9A-Fa-f]{3}){1,2}|rgba\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*[01]?.?[0-9]?\s*\)|rgb\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*\)', elements[j+1])
			values = elements[j+1].split(' ')
			for value in values:
				if value in colorValues.keys():
					colors.append(value)
			for color in colors:
				value = color
				if color not in color_variables:
					total_colors = total_colors + 1
					value = value.replace(color, "var(--color_" +
											str(total_colors) + ')')
					color_variables[color] = "--color_" + \
						str(total_colors)
				else:
					value = value.replace(
						color, "var(" + color_variables[color] + ")")
			print(value)
			insideJS += value + '"'
			newjs += insideJS
			j = j + 2
		else:
			newjs += element
			j = j + 1
			
		
				


		# print(newjs)

		

print(newjs)

for key in color_variables:
	print(key,'=>',color_variables[key])