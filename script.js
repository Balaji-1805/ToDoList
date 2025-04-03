//JavaScript Code
let input=document.getElementById('input');
let btn=document.getElementById('add-btn');
let unorderList=document.getElementById('taskList');

//Add task Functionality
btn.addEventListener('click',addTask);
input.addEventListener('keypress',function(e){
    if(e.key=='Enter')
    {
        addTask();
    }
});

//function for adding tasks after clicking button
function addTask()
{
    if(!input.value)
    {
        alert("Enter Task");
        return;
    }

    //Adding checkbox for marking task
    let checkBox=document.createElement('input');
    checkBox.type='checkbox';
    checkBox.name='task';

    let removeButton=document.createElement('button');
    removeButton.type='button';
    removeButton.textContent='❌'

    let taskName=document.createElement('span');
    taskName.textContent=input.value.trim();
    input.value='';
    // console.log(taskName);

    let li=document.createElement('li');
    li.appendChild(checkBox);
    li.appendChild(taskName);
    li.appendChild(removeButton);

    unorderList.appendChild(li);
    
    checkBox.addEventListener('change',()=>{
        if(checkBox.checked)
        {
        taskName.style.textDecoration="line-through";
        taskName.style.textDecorationThickness='2px';
        taskName.style.textDecorationColor='black';
        }
        else
        {
            taskName.style.textDecoration='none';

        }
    })

    removeButton.addEventListener('click',function(){
        console.log(li);
        li.remove();
    })

}

//edit functionality
//ul->unorderList

//Event delegation
unorderList.addEventListener('click',function(event)
{
    let list=event.target;
    if(list.tagName=='SPAN')
    {
        let oldValue=list.textContent;
        let input=document.createElement('input');
        input.setAttribute('id','edit');
        input.type='text';
        input.value=oldValue;
        list.textContent='';
        list.appendChild(input);
        input.focus();

        input.addEventListener('keypress',function(e){
            if(e.key=='Enter')
            {
                saveEdit(list,input);
            }
        });

        input.addEventListener('blur',function(){
            saveEdit(list,input);
        })
    }
});

function saveEdit(list,input)
{
    list.textContent=input.value.trim()||"Enter Task";
}



//Drag and drop feature
let draggedItem=null;

//drag start
unorderList.addEventListener('dragstart',(e)=>{
    draggedItem=e.target;
    // e.target.style.opacity="0.5";
});

//drag over
unorderList.addEventListener('dragover',(e)=>
{
    e.preventDefault();
});

//handle drop
unorderList.addEventListener('drop',(e)=>
{
    e.preventDefault();
    if(e.target.tagName=="LI"&&draggedItem!==e.target)
    {
        let items=[...unorderList.children];
        let draggedIndex=items.indexOf(draggedItem);
        let targetIndex=items.indexOf(e.target);

        if(draggedIndex>targetIndex)
        {
            unorderList.insertBefore(draggedItem,e.target);
        }
        else
        {
            unorderList.insertBefore(draggedItem,e.target.nextSibling);
        }
    }
    draggedItem.style.opacity="1";
});

