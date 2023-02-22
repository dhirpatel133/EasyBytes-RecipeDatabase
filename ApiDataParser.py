import requests
import csv


# list of all the recipes. each recipe is a struct with its own information
recipeList = []
caloriesList = []


# get random recipes
getURL = "https://api.spoonacular.com/recipes/random?apiKey=b1e63afbf020433084a95bd0c0ef803f&number=30"
req = requests.get(url = getURL)
data = req.json()

allRecipes = data['recipes']

def parseIngredients(ingredientsStructList):
    allIngredients = []
    for ingredient in ingredientsStructList:
        allIngredients.append(ingredient['original'])
    return allIngredients

def parseInstructions(instructionsStructList):
    allInstructions = []
    for instr in instructionsStructList:
        for steps in instr['steps']:
            allInstructions.append(steps['step'])
    return allInstructions

def parseApi():
    for recipe in allRecipes:
        try:
            #print(recipe['title'])
            #print(recipe['cuisines'])
            recipeStruct = {}
            recipeStruct['healthScore'] = recipe['healthScore']
            recipeStruct['readyInMinutes'] = recipe['readyInMinutes']
            recipeStruct['id'] = recipe['id']
            recipeStruct['name'] = recipe['title']
            recipeStruct['servings'] = recipe['servings']
            recipeStruct['image'] = recipe['image']
            recipeStruct['diet'] = recipe['diets']
            recipeStruct['dishTypes'] = recipe['dishTypes']
            recipeStruct['cuisines'] = recipe['cuisines']
            recipeStruct['ingredients'] = parseIngredients(recipe['extendedIngredients'])
            recipeStruct['instructions'] = parseInstructions(recipe['analyzedInstructions'])
            recipeList.append(recipeStruct)
        except:
            continue

# this call will get all the information needed for the recipe table, except for calories
parseApi()

#print(recipeList)

# get calories by making a separate call and store the calories in a list
# with the same order the recipes are stored in a list so there is a one to one
# correspondance.
for recipe in recipeList:
    getCaloriesURL = "https://api.spoonacular.com/recipes/{}/information?includeNutrition=true&apiKey=b1e63afbf020433084a95bd0c0ef803f".format(recipe['id'])
    req = requests.get(url = getCaloriesURL)
    data2 = req.json()
    nutrition = data2['nutrition']
    nutrients = nutrition['nutrients']
    calories = round(nutrients[0]['amount'])
    #caloriesList.append(calories)

    uid = 100
    if (len(recipe['cuisines']) != 0):
        with open('test.csv', 'w', newline='') as f:
                thewriter = csv.writer(f)
                
                thewriter.writerow(['recipe_id', 'name', 'cuisine', 'time', 'ingredients', 'instructions', 'calories',
                'type', 'health_label', 'health_score', 'servings', 'picture'])

                for recipe in recipeList:            
                    thewriter.writerow([uid, recipe['name'], '|'.join(recipe['cuisines']), recipe['readyInMinutes'], '|'.join(recipe['ingredients']),
                    '|'.join(recipe['instructions']), calories, '|'.join(recipe['dishTypes']), '|'.join(recipe['diet']), 
                    recipe['healthScore'], recipe['servings'], recipe['image']])
                    uid += 1

# print ingredients and steps
# for recipe in recipeList:
#     for items in recipe['ingredients']:
#         print(items)
#     print("\nGoing to print the steps now...\n")
#     i = 1
#     for steps in recipe['instructions']:
#         print("{}. {}".format(i, steps))
#         i += 1
