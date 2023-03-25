import requests
import csv
import random

cuisineList = ["Mediterranean", "British", "French", "Mexican", "Indian", "Italian", "American"]


# list of all the recipes. each recipe is a struct with its own information
recipeList = []
caloriesList = []


# get random recipes
getURL = "https://api.spoonacular.com/recipes/random?apiKey=87d3636786a944f49d20b8b0fea383ad&number=30"
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
            if (len(recipe['cuisines']) == 0):
                recipeStruct['cuisines'].append(cuisineList[random.randint(0,6)])
            recipeList.append(recipeStruct)
        except:
            continue

# this call will get all the information needed for the recipe table, except for calories
parseApi()

# get calories by making a separate call and store the calories in a list
# with the same order the recipes are stored in a list so there is a one to one
# correspondance.
for recipe in recipeList:
    try:
        getCaloriesURL = "https://api.spoonacular.com/recipes/{}/information?includeNutrition=true&apiKey=87d3636786a944f49d20b8b0fea383ad".format(recipe['id'])
        req = requests.get(url = getCaloriesURL)
        data2 = req.json()
        nutrition = data2['nutrition']
        nutrients = nutrition['nutrients']
        calories = round(nutrients[0]['amount'])
        caloriesList.append(calories)
    except:
        caloriesList.append(random.randint(250, 600))

print(caloriesList)
print(len(recipeList))

with open('test.csv', 'a', newline='') as f:
        thewriter = csv.writer(f)                
        thewriter.writerow(['name', 'cuisine', 'time', 'ingredients', 'instructions', 'calories',
               'type', 'health_label', 'health_score', 'servings', 'picture'])
        
        for i in range(0, len(recipeList) - 1):
            print(recipeList[i]['name'])
            thewriter.writerow([recipeList[i]['name'], '|'.join(recipeList[i]['cuisines']), recipeList[i]['readyInMinutes'], '|'.join(recipeList[i]['ingredients']),
                    '|'.join(recipeList[i]['instructions']), caloriesList[i], '|'.join(recipeList[i]['dishTypes']), '|'.join(recipeList[i]['diet']), 
                    recipeList[i]['healthScore'], recipeList[i]['servings'], recipeList[i]['image']])

