const task_input= document.querySelector('input');
const add_task_btn = document.querySelector('.add_task');
const task_list = document.querySelector('.task_list');

function show_Already_available(){

    let task_available = JSON.parse(localStorage.getItem('tasks'));
    console.log(task_available);
    if(task_available){
    task_available.forEach(task=>{
        createTask(task.task, task.completed);
        
    })
    update_TaskStatics();
    }
}

show_Already_available();


function addTask(){
    let task = task_input.value.trim();

    if(task){
        task_input.value='';
        createTask(task, false);
        save_to_localStorage();
            
    }
    else{
        alert('Please enter a task to add in to do.');
    }
}


function createTask(task, completed){
    let task_li= document.createElement('li');
    task_li.classList.add("task");
    task_li.innerHTML=`<div class="task_text">
               ${completed ? ' <input type="checkbox" checked class="checkbox">' : '<input type="checkbox" class="checkbox">'}
                ${completed ? `<p style="text-decoration: line-through;">${task}</p>`:`<p style="text-decoration: none;">${task}</p>`}
            </div>
            <div class="taskbtns">
                <i class="fa-regular fa-pen-to-square update" style="color: #828dff;" ></i>
                <i class="fa-solid fa-trash-can delete" style="color: rgb(250, 41, 41)" ></i>
   
            </div>`;

    // for dynamic contents event listener should be attahed while creation and envent lsitener are automatically called even if that particular function is not being called.

    const delete_btn= task_li.querySelector('.delete');
    delete_btn.addEventListener('click', ()=>{
        task_li.remove();
        save_to_localStorage();
        update_TaskStatics();
    })
    const update_btn= task_li.querySelector('.update');
    update_btn.addEventListener('click', ()=>{
        task_input.value=task_li.querySelector('p').innerText;

        task_li.remove();
         save_to_localStorage();
         update_TaskStatics();
    })
   
      
    let checkbox = task_li.querySelector('input');
    checkbox.addEventListener('change', ()=>{
        if(checkbox.checked){
            task_li.querySelector('p').style.textDecoration= "line-through";
            save_to_localStorage();
            update_TaskStatics();
        }
        else{
            task_li.querySelector('p').style.textDecoration= "none";
            save_to_localStorage();
            update_TaskStatics();
        }
    })

    
    
    task_list.appendChild(task_li);  
    update_TaskStatics();
}

function save_to_localStorage(){
 let tasks=[];
 let all_tasks = document.querySelectorAll('li');
 all_tasks.forEach((task)=>{
    let completed = task.querySelector('input').checked;
    tasks.push({"task": task.querySelector('p').innerText, "completed": completed});
 });
 localStorage.setItem('tasks', JSON.stringify(tasks));
}

add_task_btn.addEventListener('click', (e)=>{
   e.preventDefault();
   addTask();
});

function update_TaskStatics(){
    let progress= document.querySelector('.progress');
    let number= document.getElementById('number');
    let number_tasks= document.querySelectorAll('.task').length;
    let all_checkboxes= document.querySelectorAll('.checkbox');
    let total_checked=0;
    all_checkboxes.forEach(checkbox =>{
     if(checkbox.checked){
        total_checked++;
     }
    })
    
    number.innerText=`${total_checked}/${number_tasks}`;
    if(number_tasks==0){
        progress.style.width='0%';
    }
    else{
    progress.style.width=`${(total_checked/number_tasks).toFixed(2)*100}%`;
    }
}


