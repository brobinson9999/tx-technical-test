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
