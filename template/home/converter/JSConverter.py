import re
import matplotlib
from .color_Variable import variables

class jsConverter:
	
	def __init__(self,filename,data):
		self.filename = filename
		self.data = data

	
	def halfhex_tofull(self,hexcode):
		new_hex_code = '#{}'.format(''.join(2 * c for c in hexcode.lstrip('#')))
		return new_hex_code

# convert rgb and rgba to hex


	def rgb_tohex(self,rgb):

		f = rgb.index("(")
		l = rgb.index(")")

		numbers = rgb[f+1:l]

		numbers = numbers.split(',')
		i = 0
		while i < len(numbers):
			numbers[i] = float(numbers[i].strip())
			if numbers[i] > 1:
				numbers[i] = numbers[i]/255
			i = i+1

		if len(numbers) == 3:
			hexcode = matplotlib.colors.to_hex(numbers, keep_alpha=False)
		else:
			hexcode = matplotlib.colors.to_hex(numbers, keep_alpha=True)

		return hexcode	

	def convert(self):
		
		colorValues = {'aliceblue': '#F0F8FF', 'antiquewhite': '#FAEBD7', 'aqua': '#00FFFF', 'aquamarine': '#7FFFD4', 'azure': '#F0FFFF', 'beige': '#F5F5DC', 'bisque': '#FFE4C4', 'black': '#000000', 'blanchedalmond': '#FFEBCD', 'blue': '#0000FF', 'blueviolet': '#8A2BE2', 'brown': '#A52A2A', 'burlywood': '#DEB887', 'cadetblue': '#5F9EA0', 'chartreuse': '#7FFF00', 'chocolate': '#D2691E', 'coral': '#FF7F50', 'cornflowerblue': '#6495ED', 'cornsilk': '#FFF8DC', 'crimson': '#DC143C', 'cyan': '#00FFFF', 'darkblue': '#00008B', 'darkcyan': '#008B8B', 'darkgoldenrod': '#B8860B', 'darkgray': '#A9A9A9', 'darkgrey': '#A9A9A9', 'darkgreen': '#006400', 'darkkhaki': '#BDB76B', 'darkmagenta': '#8B008B', 'darkolivegreen': '#556B2F', 'darkorange': '#FF8C00', 'darkorchid': '#9932CC', 'darkred': '#8B0000', 'darksalmon': '#E9967A', 'darkseagreen': '#8FBC8F', 'darkslateblue': '#483D8B', 'darkslategray': '#2F4F4F', 'darkslategrey': '#2F4F4F', 'darkturquoise': '#00CED1', 'darkviolet': '#9400D3', 'deeppink': '#FF1493', 'deepskyblue': '#00BFFF', 'dimgray': '#696969', 'dimgrey': '#696969', 'dodgerblue': '#1E90FF', 'firebrick': '#B22222', 'floralwhite': '#FFFAF0', 'forestgreen': '#228B22', 'fuchsia': '#FF00FF', 'gainsboro': '#DCDCDC', 'ghostwhite': '#F8F8FF', 'gold': '#FFD700', 'goldenrod': '#DAA520', 'gray': '#808080', 'grey': '#808080', 'green': '#008000', 'greenyellow': '#ADFF2F', 'honeydew': '#F0FFF0', 'hotpink': '#FF69B4', 'indianred': '#CD5C5C', 'indigo': '#4B0082', 'ivory': '#FFFFF0', 'khaki': '#F0E68C', 'lavender': '#E6E6FA', 'lavenderblush': '#FFF0F5', 'lawngreen': '#7CFC00', 'lemonchiffon': '#FFFACD', 'lightblue': '#ADD8E6', 'lightcoral': '#F08080', 'lightcyan': '#E0FFFF', 'lightgoldenrodyellow': '#FAFAD2', 'lightgray': '#D3D3D3', 'lightgrey': '#D3D3D3',
            'lightgreen': '#90EE90', 'lightpink': '#FFB6C1', 'lightsalmon': '#FFA07A', 'lightseagreen': '#20B2AA', 'lightskyblue': '#87CEFA', 'lightslategray': '#778899', 'lightslategrey': '#778899', 'lightsteelblue': '#B0C4DE', 'lightyellow': '#FFFFE0', 'lime': '#00FF00', 'limegreen': '#32CD32', 'linen': '#FAF0E6', 'magenta': '#FF00FF', 'maroon': '#800000', 'mediumaquamarine': '#66CDAA', 'mediumblue': '#0000CD', 'mediumorchid': '#BA55D3', 'mediumpurple': '#9370D8', 'mediumseagreen': '#3CB371', 'mediumslateblue': '#7B68EE', 'mediumspringgreen': '#00FA9A', 'mediumturquoise': '#48D1CC', 'mediumvioletred': '#C71585', 'midnightblue': '#191970', 'mintcream': '#F5FFFA', 'mistyrose': '#FFE4E1', 'moccasin': '#FFE4B5', 'navajowhite': '#FFDEAD', 'navy': '#000080', 'oldlace': '#FDF5E6', 'olive': '#808000', 'olivedrab': '#6B8E23', 'orange': '#FFA500', 'orangered': '#FF4500', 'orchid': '#DA70D6', 'palegoldenrod': '#EEE8AA', 'palegreen': '#98FB98', 'paleturquoise': '#AFEEEE', 'palevioletred': '#D87093', 'papayawhip': '#FFEFD5', 'peachpuff': '#FFDAB9', 'peru': '#CD853F', 'pink': '#FFC0CB', 'plum': '#DDA0DD', 'powderblue': '#B0E0E6', 'purple': '#800080', 'red': '#FF0000', 'rosybrown': '#BC8F8F', 'royalblue': '#4169E1', 'saddlebrown': '#8B4513', 'salmon': '#FA8072', 'sandybrown': '#F4A460', 'seagreen': '#2E8B57', 'seashell': '#FFF5EE', 'sienna': '#A0522D', 'silver': '#C0C0C0', 'skyblue': '#87CEEB', 'slateblue': '#6A5ACD', 'slategray': '#708090', 'slategrey': '#708090', 'snow': '#FFFAFA', 'springgreen': '#00FF7F', 'steelblue': '#4682B4', 'tan': '#D2B48C', 'teal': '#008080', 'thistle': '#D8BFD8', 'tomato': '#FF6347', 'turquoise': '#40E0D0', 'violet': '#EE82EE', 'wheat': '#F5DEB3', 'white': '#FFFFFF', 'whitesmoke': '#F5F5F5', 'yellow': '#FFFF00', 'yellowgreen': '#9ACD32'}
		
		old_variables = variables['old_variables']
		# new set of variable names mapped with corresponding hex value
		color_variables = variables['color_variables']
		# total no of colors used by user
		total_colors = variables['total_variable']
		
		jsFile = open(self.filename, "w")
		
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
			'textDecorationColor': 0,
			'animation':0,
			'textShadowColor':0

		}
		

		data = self.data

		elements = re.split('"|`|\'',data)
		# print(elements)
		newjs = ''
	
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
						colors = re.findall('var\(--[a-zA-Z0-9_-]*\)|#(?:[0-9A-Fa-f]{3}){1,2}|#(?:[0-9A-Fa-f]{4}){1,2}|rgba\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*[01]?.?[0-9]?\s*\)|rgb\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*\)', mixColor)
						values = mixColor.split(' ')
						for value in values:
							# print(value)
							if value in colorValues.keys():
								colors.append(colorValues[value])
								
						print(value)
						
						for color in colors:

							if re.search('^rgb*', color):
								newcolor = self.rgb_tohex(color)
								print("converted",color)
							
							elif color[0] == '#' and len(color) <= 5:
								newcolor = self.halfhex_tofull(color)
								print("converted => ",newcolor)

							else:
								newcolor = color

							if color in old_variables:

								property = property.replace(color,old_variables[color])
							
							elif newcolor not in color_variables:
								total_colors = total_colors + 1
								property = property.replace(color, "var(--color_" + str(total_colors) + ')')
								print("not in => ",color)
								color_variables[newcolor] = "--color_" + \
									str(total_colors)

							else:
								property = property.replace(color, "var(" + color_variables[newcolor] + ")")
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
					colors = re.findall('var\(--[a-zA-Z0-9_-]*\)|#(?:[0-9A-Fa-f]{3}){1,2}|#(?:[0-9A-Fa-f]{4}){1,2}|rgba\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*[01]?.?[0-9]?\s*\)|rgb\(\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*,\s*(?:[01]?[0-9][0-9]?|[2][0-4][0-9]|25[0-5])\s*\)', elements[j+1])
					values = elements[j+1].split(' ')

					for value in values:
						print("h=> ",value)
						if value in colorValues.keys():
							colors.append(colorValues[value])
					
					print(colors)		
					for color in colors:
						value = color
						if re.search('^rgb*', color):
							newcolor = self.rgb_tohex(color)
						
						elif color[0] == '#' and len(color) <= 5:
							newcolor = self.halfhex_tofull(color)
						
						else:
							newcolor = color

						if color in old_variables:
							print("old=> ",color)
							value = value.replace(color,old_variables[color])

						elif newcolor not in color_variables:
							total_colors = total_colors + 1
							value = value.replace(color, "var(--color_" +
													str(total_colors) + ')')
							color_variables[newcolor] = "--color_" + \
								str(total_colors)
						else:
							value = value.replace(
								color, "var(" + color_variables[color] + ")")
					print(value)
					insideJS += value + '"'
					newjs += insideJS
					j = j + 2
				
				else:
					if '<' in element or '>' in element:
						tags = element.split(' ')
						# print(tags)
						angleBracket = re.findall('<[a-zA-Z]*\s|</[a-zA-Z]*>',element)
						# print(angleBracket)
						if angleBracket:
							if '</' in angleBracket[0]:
								# print('hello')
								current = tags[0] + '`'
							else:	
								current = '`' + tags[0]
							k=1
							# print(current)
							while k < len(tags):
								current += ' ' + tags[k]
								if k+1 == len(tags):
									current += '"'
								k = k + 1
							# print(current)
							insideJS = current
						else:
							insideJS = element + '"'	
							# print(insideJS)
					else:
						# print("not >" ,element)
						if j+1 != len(elements):

							angleBracket = re.findall('<[a-zA-Z]*\s|</[a-zA-Z]*>',elements[j+1])
							if angleBracket:
								insideJS = element
							else:	
								insideJS = element + '"'

							# print(insideJS)

						else:
							insideJS = element

					newjs +=  insideJS
					j = j + 1


				# print(newjs)

				

		# 
		# return newjs
		variables['old_variables'] = old_variables
		variables['total_variable'] =  total_colors
		variables['color_variables'] = color_variables
		# print(variables)
		jsFile.seek(0)  
		# jsFile.truncate()
		jsFile.write(newjs)
		# return variables['total_variable']
		print(newjs)
		print(old_variables)
		print(color_variables)
# for key in color_variables:
# 	print(key,'=>',color_variables[key])
