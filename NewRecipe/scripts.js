
function userSearch() {
    let YOUR_APP_ID = `0a2cb16c`; 
    let YOUR_APP_KEY= `df317eac9cacca743c171812de787e94`;
    let search_user = document.getElementById('search');
    let category_search = document.getElementById('category_search');
    let list_recipe =document.getElementById('list_recipe');
    let section_recipes = document.getElementById('section_recipes');
            //Validation(line 10-20)
//Clears the results and shows him the result he requested  
    if(list_recipe!= null || list_recipe!=""||list_recipe!= undefined)                  
        document.getElementById('list_recipe').innerHTML="";
//checker if user dont file parameters (INPUT TEXT & SELECTION)
    if((search_user.value == '' || search_user.value==="Write someting")&& category_search.value == 'Category')  
        return search_user.value = "Write someting";  
    else
    {
        if(category_search.value != 'Category')              //cheacker if the user chose from optins selector                        
        {
            search_user.value = category_search.value 
        }
        let apiRecipe = fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search_user.value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&diet=low-fat`)
        .then((jsonRecipe) => jsonRecipe.json())
        .then((Recipe) => cheackRecipe(Recipe))
}
}

function cheackRecipe (Recipe)
{
    if(Recipe.hits.length==0 )                        
    return document.getElementById('no_result').innerHTML="No result";        //cheacker if have resualt for
    else
    {
        document.getElementById('no_result').innerText="";
        printRecipes(Recipe)
    }
}
function printRecipes(Recipe)
{
    for (let i=0 ; i< Recipe.hits.length ; i++)
    {
            let keyRecipe =Recipe.hits[i]._links.self.href;
            let numberButton = keyRecipe.substring(keyRecipe.indexOf('v2/')+3,keyRecipe.lastIndexOf("?")-1);
            console.log(numberButton);
        //Crate Elements
        let card = document.createElement('div');
        let card_img_top = document.createElement('img');
        let card_body = document.createElement('div');
        let card_title = document.createElement('h5');
        let card_text = document.createElement('p');
        let card_btn = document.createElement('button')
        let list_recipe =document.getElementById('list_recipe');
        let section_recipes = document.getElementById('section_recipes');

        //Add class to Elements
        card.classList.add(`card`,`${numberButton}`);
        card_img_top.setAttribute("id", `card-img-top ${numberButton}`);
        card_body.classList.add('card-body');
        card_title.classList.add('card-title');
        card_text.classList.add('card-text');
        card_btn.classList.add('btn',`btn-primary`,`${numberButton}`);

        //Properties
        card_btn.innerHTML="Add Favorite";
        card_title.innerHTML = Recipe.hits[i].recipe.label;
        //Break text recipe to lines   
        card_text.innerHTML = Recipe.hits[i].recipe.ingredientLines.map((line_recipe)=>{   
            let line = line_recipe+"<br>";
            return line;
            })
        card.style.width = '22rem';
        //Print to DOM
        card_body.append(card_title);
        card_body.append(card_text);
        card_body.append(card_btn);
        card.append(card_img_top)
        card.append(card_body);
        list_recipe.append(card);
        section_recipes.append(list_recipe);
        document.getElementById(`card-img-top ${numberButton}`).src = `${Recipe.hits[i].recipe.image}`;

    //Button Add To Favorite//
        card_btn.addEventListener('click',(event)=>{
            favorite = document.getElementById('favorite');
            //Crate Elements
            let card_fav = document.createElement('div');
            let card_img_top_fav = document.createElement('img');
            let card_body_fav = document.createElement('div');
            let card_title_fav = document.createElement('h5');
            let card_text_fav = document.createElement('p');
            let card_btn_fav = document.createElement('button')

            //Add class to Elements
            card_fav.classList.add(`card`,`fav`,`${numberButton}`);
            card_img_top_fav.setAttribute(`id`, `card-img-top ${numberButton}`);
            card_body_fav.classList.add('card-body');
            card_title_fav.classList.add('card-title');
            card_text_fav.classList.add('card-text');
            card_btn_fav.classList.add('btn',`btn-primary`);
            card_btn_fav.setAttribute('id',`${numberButton}`);

            //properties
            card_title_fav.innerText=card_title.innerText;
            card_text_fav.innerText=card_text.innerText;

            //Print to Favorite Site in DOM
            card_body_fav.append(card_title_fav);
            card_body_fav.append(card_text_fav);
            card_body_fav.append(card_btn_fav);
            card_fav.append(card_img_top_fav)
            card_fav.append(card_body_fav);
            favorite.append(card_fav);
            
            //add Text to Remove Button in Favorite Section
            document.getElementById(`card-img-top ${numberButton}`).src = card_img_top.src
            document.getElementById(`${numberButton}`).innerHTML = "remove";

            // add to local host data
           
               if(window.localStorage.length==0)
               {
                let dataSave = {"id":card_fav.className,"recipe":card_text_fav.innerText,"image":document.getElementById(`card-img-top ${numberButton}`).src } 
                window.localStorage.setItem(`ArryFavoriteRecipes`,JSON.stringify(dataSave));
                console.log(window.localStorage.getItem('ArryFavoriteRecipes'));

               }
               else
               {
                
                let dataSave =[ {"id":card_fav.className,"recipe":card_text_fav.innerText,"image":document.getElementById(`card-img-top ${numberButton}`).src } , JSON.parse(localStorage.getItem('ArryFavoriteRecipes'))]
                window.localStorage.setItem(`ArryFavoriteRecipes`,JSON.stringify(dataSave));
                console.log(dataSave);
               }

    
            
        
        })
    }
 // //Print after user refresh the web, take data from local storage and print 

 
}

function startFavorite()
{

    console.log(window.localStorage)
    for(let i =0; i<window.localStorage.length;i++)
    {
        console.log(window.localStorage.getItem('ArryFavoriteRecipes') )
    }

    
}
startFavorite();