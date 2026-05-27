// add , list , remove ,clear

// use fs module

// console.log(Date())

// buit-in this at Sat May 16 2026 09:56:05 GMT+0200 (Central Africa Time)

/*
 * test
 *
 * add a task []
 *
 * list tasks []
 *
 * remove a task []
 *
 * clear all tasks []
 *
 */

import fs from 'fs'


const source = 'taskdb.json'


const version = '1.0.0'

function printDate(){
    let d = new Date()

    let year =d.getFullYear().toString();

    let month = "0"+(d.getMonth()+1).toString();

    let day = d.getDate().toString();

    let hour = d.getHours().toString();

    let min = d.getMinutes().toString();


    return `${year}-${month}-${day}_${hour}:${min}`
}
// generate id for task
// exam : 001 , 002 , 003
function genId() {

    let genId = Math.random() * 999

    genId = Math.round(genId)

    return String(genId).padStart(3,'0')

}

// add data to object convert json

function addDateJSON(id , date , titleTask){

    let task ;



    task = new Object({
        "id"    : id,
        "title":titleTask,
        "date":date
    })

    // task = JSON.stringify(task)

    // task += ","

    return task
}



if (true){
switch (process.argv[2]) {

// [
//     {
//         "id":01,
//         "title":"task1",
//         "date":"2022-02-24_09:00",
//
//
//     }
// ]

// store as object inside array [ obj,obj] => [ task1, task2]
    case 'add':

        let taskUser , task;

        process.argv[3] ? taskUser = process.argv[3] : taskUser = null;

        if(taskUser != null) {

            let genid = genId()

            let dateTask = printDate()

            // step 1 get file

            fs.readFile(source,'utf-8',(er,d)=>{
                if (er) console.log('file not found!');

            d = JSON.parse(d)


            console.log(typeof d,d)


           // // step 2 add task
            task = addDateJSON(genid , dateTask , taskUser );


            d.push(task)


            d = JSON.stringify(d)

            // console.log(d)
            // console.log(typeof task)



            fs.writeFile(source,d,(err)=>{
                if (err) console.log('error write a file !');

            })

            })




        } else {
            console.log('enter a task and try again')
        }

        break;

    case 'list':


        fs.readFile(source,'utf-8',(er , data)=>{
            if (er) throw er;

            // string -> object js

            data = JSON.parse(data)

            // display tasks

            console.log("-".repeat(50))

            console.log('id'+' '.repeat(10)
            +'name'+' '.repeat(10)+'date')

            console.log("-".repeat(50))

            data.forEach(t=>{
            console.log(t.id +' '.repeat(10)+t.title +' '.repeat(10) + t.date )

            })

            data = null
            // console.log(data , typeof data)

        })




        break;

    case 'remove':



        let idtaskremove ;


        process.argv[3] ? idtaskremove = process.argv[3] :idtaskremove = null;

        if( idtaskremove !== null ) {

            if(!isNaN(idtaskremove)){

        fs.readFile(source,'utf-8',(er , data)=>{

            //  console.log(data,typeof data) // string


            data = JSON.parse(data)

            let remove = data.filter( obj => obj.id != idtaskremove)

            console.log('after remove'+remove.length)
            console.log('before remove'+data.length)


            if ( data.length > remove.length ) {

                remove = JSON.stringify(remove)



                fs.writeFile(source,remove , (er,data)=>{
                    if (er) throw er ;

                    console.log('done! remove task with id : '+idtaskremove)
                })


            } else {
                console.log('the task not Found !')
            }


        })


            } else {
                console.log('enter number')
            }


        } else {
    console.log('Enter Id of task for remove ')
        }

        break;

        case 'clear':

            fs.writeFile(source , '[]', (er) => {
                if (er) throw er ;

                console.log('Done delete all your tasks ')
            })

            break;


        case 'helps':

            console.log(`

            simple cli task manager
            -----------------------

            version ${version}



            taskv3.js helps


            how to use :
            ----------------
            app options

            options :

            add , list , remove , clear

            add [title task]:

            for add a task
                [title task ] look like :
                add 'cook a chicken for dinner'

                list :

                for show all tasks
                    remove [task] :
                    for remove a task look like :
                        remove 'finish workhome '

                        clear :
                        for delete all task

                            exam:
                            before clear (your tasks : 30 )
                            after clear ( your task : 0 )`)


            break ;


        case 'version':
        case '-v' :

            console.log(`you are use version [${version}]`)

            break;


        default:

            console.log('\ntry type : \n\nnode taskv3.js helps \n')

            break ;

}

}
