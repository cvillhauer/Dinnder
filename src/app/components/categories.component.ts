// import { Component, OnInit } from '@angular/core';
// import { Category } from '../model/category';
// import { CategoryService } from '../services/category.service';

// @Component({
//   selector: 'categories',
//   template:
//   `<div>
//     <div *ngFor="let category of categories">
//         {{category.title}}
//     </div>
//   </div>
//   `
// })
// export class CategoriesComponent implements OnInit {
//   categories: Category[];
//   constructor(public catService: CategoryService) { }
//   ngOnInit(): void {
//       this.catService.getCategories().subscribe(categories => this.categories = categories);
//   }
// }
