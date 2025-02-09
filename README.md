
## The Problem

There are major health disparities in the U.S. for people of color. Two major barriers are costs and trust in medical systems. 47% of healthcare professionals say they have observed discrimination in their practice and 52% say it is a major problem. According to NY state law, hospitals must be transparent in cost, quality, and safety, yet there is no easy way for people to access this information that could potentially sway major healthcare decisions.

## Our Solution
We created a website that takes in user demographics and symptoms and then matches them with hospitals in New York. We also created a healthcare companion, powered by Groq, who gives you personalized health recommendations. 

We pulled state-wide hospital-level health data from official New York State sources and compiled it into a dataset. This took extreme effort to combine the data over different datasets and create tangible metrics for the user to understand. In total, we combined over 6 National/Statewide datasets. One of the data sets involved the cost data, which had to be interpreted to create a score of how expensive that hospital would cost compared to others for your target symptoms and conditions. The satisfaction rating is a measure of communication between healthcare providers and patients, evaluating qualitative reviews to quantify quality of care. Lastly, the racial bias, depending on the race and gender you register with, was based on three metrics: disparity in the length of stay of patients with similar conditions but different demographics; disconnect between the type of admit (Emergency, Urgent, Elective etc) and severity of illness, which could allude to healthcare professionals underplaying patients’ patients. All of these scores are then added in aggregate to represent the overall score of the hospital. 

Our final component is a chatbot that allows the user to input specific symptoms, and in the future, we hope to implement a symptom tracker that allows us to track symptoms over time and match people more effectively to hospitals. 

## How To Use It

Fair Health Finder is designed to make healthcare decisions easier by providing transparent and accessible data about hospitals. Follow these simple steps to get started:
The Registry Page allows you to search for hospitals by location, medical condition, or healthcare service. Simply enter your search criteria, and the page will display a list of hospitals that match your preferences. Each hospital entry provides essential information such as the hospital's name, location, cost ratings, safety scores, and more.

The Interactive Map provides a visual representation of hospitals in your area. You can zoom in and out to view hospitals nearby or in other regions. Each hospital on the map is marked with a score representing its cost, quality of care, and safety. Click on any hospital's marker to get detailed information about its services, ratings, and patient feedback.

Once you’ve explored the hospitals and their data, Fella, your virtual assistant, will provide personalized recommendations. Fella analyzes your preferences, such as your location, cost considerations, and the types of care you need, and suggests hospitals that best match your criteria. Fella will help guide you toward the best options based on your needs.

## How We Built It

MongoDB was used to store all user data, including usernames, passwords, and other relevant information. ExpressJS facilitated a backend server to seamlessly perform RESTful API functions with our remote MongoDB database. ReactJS, along with its extensive component libraries, was used to design an interactive and responsive front-end that ensures a simple and intuitive user experience. NodeJS integrated all components, enabling smooth functionality across the stack. The Langchain and Groq APIs, in conjunction with LLaMA 3.3-70B, power an insightful, user-friendly RAG AI companion that provides personalized guidance to patients based on their unique demographics.

## Challenges We Ran Into

One difficulty was creating the data of hospitals in New York. Even though this data should be transparent, it was difficult to find both current and applicable information. Specifically, even though there was quite robust cost data, it was buried within a website with over 70 other datasets with similar names. 
Another difficulty was using git since we were new to group source control. This experience was valuable since it taught us good practices for the future. Personally, I understood some basic git commands, but until this project I didn’t actually understand what it meant or why I would run into errors like merging errors.
Since there were so many relevant symptoms and potential conditions, we had to figure out how to store this data for each user. This forced us to make difficult decisions regarding how to store the data: how can we load the conditions of interest/operations of interest for the user when generating facts like safety and cost? Given this was our first time using MongoDB, we encountered difficulty with integrating it into our website. 

## Looking Forward

We are proud of the progress we have made in just a single day, and we are also excited about the future of Fair Health Finder. Our next steps would be to add more personalization to the website. For example, as we mentioned earlier, we want to integrate the chatbot into symptom tracking. Currently, we track symptoms statically, but it would be more effective to track the data over time so that healthcare providers can access this information and our website can provide better recommendations. 











