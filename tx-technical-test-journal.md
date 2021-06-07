# 2021-06-05 10:30

To prepare for this project, I did a quick web search to find some documentation on React.JS and Django. I started with the react step-by-step guide in the reactjs.org docs at:

  https://reactjs.org/docs/hello-world.html
  

For the Django side I studied a guide on a blog at:

  https://www.valentinog.com/blog/drf/


There are obviously many ways one could approach this. For this project I chose to use a similar organization to what is used in these two guides. Each presents its own workflow, which I have followed as closely as reasonable for this project.

The reactjs.org recommended workflow (from https://reactjs.org/docs/thinking-in-react.html) is:

Step 1: Break The UI Into A Component Hierarchy
Step 2: Build A Static Version in React
Step 3: Identify The Minimal (but complete) Representation Of UI State
Step 4: Identify Where Your State Should Live
Step 5: Add Inverse Data Flow

There is also an API to design. I think I will start from the UI, and the API should flow naturally from that. The sample data to import is a single table.
 I think for the purposes of the test, I'll use the model as it is, and just note that I would have designed the model differently. However, it isn't enough on its own. It also needs to store information about the current booking. Really, this should be a separate object, but if you did that you'd be duplicating information with some of the fields on the product model. Given the time constraints and the input data format, the simplest thing is to add additional columns to the existing table to hold the necessary information.


# 2021-06-06 07:20

## Step 1: Break The UI Into A Component Hierarchy

The wire frame provides an example UI that I will break down for this sample. Traditionally we start with "App" at the highest level. Under that is:

App
  - SearchBox
  - ListView
    - ListViewRow
  - Two buttons
  - Book dialog
    - Product dropdown
	- Start date
	- End date
  - Book confirm dialog
    - Message
	- Confirm button/no/yes options
  - Return dialog
  - Return confirm dialog
	- Confirm button (should ideally be consistent with book confirm dialog, but it does not match on the wireframe)

The ListView should be searchable, sortable, and "filterable". The wireframe doesn't show any way to enter criteria for filtering, but it would be nice to add. One could add a bunch of static controls for that. A really nice alternative, that would take longer, would be to analyze the existing search results, and use a facet filtering style of UI. For the first version, I think just a set of static checkboxes for "Need to Repair" for example, should be sufficient.

The absolute simplest way to do this would be to set up a Django JSON REST API service that accepts anything, and serves up a React app as a front end that uses that API as a back end, which enforces most application logic.

This has a number of downsides and I'd greatly prefer having most of the logic happen server-side. On the other hand, it is the truly "minimal" viable product. So the best strategy may be to implement this simplest possible thing, then iterate to a model where the API is responsible for more of the application logic. I think most of the time I would just skip this step and go straight to the version that has most of the logic server-side. If you know that you will end up there, one could consider it a waste to bother building the version where the logic is in the UI.

I want to be able to try some things out as I go, so my next step will be the build the basic Django and React apps.

python3 -m venv venv
source venv/bin/activate
git add .;git commit -m"python3 -m venv venv"

pip install django djangorestframework
git add .;git commit -m"pip install django djangorestframework"

django-admin startproject tx_technical_test .
git add .;git commit -m"django-admin startproject tx_technical_test ."

# Enable rest_framework in settings.py.
git add .;git commit -m"Enable rest_framework in settings.py."

django-admin startapp frontend
mkdir -p ./frontend/src/components
mkdir -p ./frontend/static/frontend
mkdir -p ./frontend/templates/frontend
git add .;git commit -m"django-admin startapp frontend"

cd ./frontend && npm init -y
npm i webpack webpack-cli --save-dev
git add .;git commit -m"npm i webpack webpack-cli --save-dev"

# Add dev and build scripts to package.json.
git add .;git commit -m"Add dev and build scripts to package.json."

npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
git add .;git commit -m"npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev"

npm i react react-dom --save-dev
git add .;git commit -m"npm i react react-dom --save-dev"

# Configure .babelrc and webpack.config.js.
git add .;git commit -m"Configure .babelrc and webpack.config.js."


# 2021-06-06

Now that I have the skeleton of the Django app and React frontend built, I will add the model and initial API for the "products" table.

django-admin startapp products
# Add the new app to django_react/settings.py
git add .;git commit -m"django-admin startapp products"

# Add the frontend app to django_react/settings.py
git add .;git commit -m"Add the frontend app to django_react/settings.py"

# Add products model.
git add .;git commit -m"Add products model and initial API."

python manage.py makemigrations products
git add .;git commit -m"python manage.py makemigrations products"

python manage.py migrate
git add db.sqlite3;git commit -m"python manage.py migrate"

# Exclude pycache files from git.
echo "__pycache__/" >> .gitignore
git add .;git commit -m"echo \"__pycache__/\" >> .gitignore"

# Add empty React.JS frontend.
git add .;git commit -m"Add empty React.JS frontend."

# Add stub for product frontend.
git add .;git commit -m"Add stub for product frontend."

npm run dev
git add .;git commit -m"npm run dev"


# As I went to import some data to test the progress so far, I noticed that the original model definition doesn't allow mileage to be nullable.
# Updated the model for products, then:
python manage.py makemigrations products
python manage.py migrate
git add .;git commit -m"Make products.mileage nullable."


I have enough of the app built to import the initial data now, and take a look at it in the React frontend. I'll tackle the initial data load first, then focus on building out the UI.


# 2021-06-06 11:00

The most convenient thing would be if I could simply POST this JSON file to the API in order to create records.

I did a little testing and found that it works when you submit dictionaries, but does not support an array of dictionaries.


# 2021-06-07 08:30

I haven't been updating the journal, but I have figured out some more. To do the initial load, I simply split the JSON array using a text editor and individually POSTed the elements to the server's Create action. A scripted solution that loads the whole file would probably be better if we were doing this multiple times or for a very large input list.

I also built out the UI and most of the logic, in the UI itself. I am now moving things to the API side.


# 2021-06-07 09:45

I've finished connecting the UI to a back-end database through the API. Still, all the processing is handled client-side. It might work for a proof-of-concept, but some operations should be moved from the UI into the back-end. For example, fee calculations, and updating the mileage and durability, should be handled server-side.

Instead of doing anything else, I'll just provide a list of improvements that I'd like to make, given time. Some of them really wouldn't take that long, but I have to draw the line somewhere.

Existing Design:

- move fee, mileage, and durability logic to the API side
- provide API to get the "current" booking, instead of getting the entire list of all bookings
- provide feedback from book and return dialogs. The Book/Return button is greyed out if the booking/return is invalid, but it does not provide any indication of why it is greyed out. So for example, if you have not filled in mileage where it applies, or if you have filled in mileage and it does not apply, the button is greyed but the mileage textbox is not highlighted.
- CSS everywhere to make it look pretty and make the dialog actually pop over like a dialog box. Dialog boxes on the web are usually an anti-pattern but since the design calls for them ideally we'd display these boxes as a dialog.
- The documentation says there should be a column to show "current status", but this does not appear on the wireframe. One could enhance the list view to show the status. (Requirement 2-1)
- Making a booking does not take a name. The documentation says it should, but the wireframe does not show this. (Requirement 2-2)
- Durability/need to repair could be better. Durability is updated, but there is no way to specify that repair is necessary. Requirement 2-3 calls for a "thing whether the product is needed to repair". So really a booking should store not just the used mileage, but also whether the person broke the item.
- Requirement 3 calls for a discount logic. But, there is no fields on the input data to support this. It's supposed to be based on a minimum rental period, but there is no period specified in the products table, nor an amount of discount. If I had more time I could have added it, but ideally I'd clarify this requirement since the most obvious implementation isn't great.
- Requirement 3 implies that meter type estimation should estimate 10 miles per day. But, the product table does not contain any price per mile. Again, it could be added given time.
- Show/hide mileage field, or grey it out, when it doesn't apply to the selected item.
- When booking, check to see if the item is already booked for the given date(s).
- There is some repetition of code, and also the code is not well factored.


Improved Design:

I think this design can be improved upon.

- Redundant product selection in "Book" - rather than having a separate dropdown inside a dialog box, it would be better if the main list view allowed selecting an element.
- "Bookings" view - should view all existing bookings, and allow filtering to only outstanding bookings where the product has not been returned yet.
- "Return" button should be on "Bookings" view, not "Product" view.
- "Return" button should select a booking, not a product.
- Actually handing out the item should be tracked. Currently, we assume that the item is handed out when the booking is made - but this doesn't really make sense because the booking could be for the future.
- "Edit" view for products at least - allow admin to modify mileage, durability, name, etc.
- Allow multiple outstanding bookings for the same item. (for different dates)