// // console.log('sync start')
// // setTimeout(() => {
// //     console.log('macro task settimeout')
// // }, 0);
// // Promise.resolve()
// //     .then(() => {
// //         Promise.resolve()
// //             .then(() => {
// //                 console.log('micro task 2')
// //             })
// //         console.log('micro task 1')
// //     })
// //     .then(() => {
// //         console.log('micro task 1 then')
// //     })
// // console.log('sync end')
// console.log('sync start')

// setTimeout(() => {
//     console.log(2)
// }, 0);

// new Promise((resolve, reject) => {
//     console.log(1)
//     setTimeout(() => {
//         resolve(3)
//     }, 0);
// })
//     .then(console.log); 

// console.log('sync end')

