export interface ICategoryRequest {
    name: string,
    categoryIcon?: string,
    categoryColor?: string
}

export interface ICategoryResponse {
    name: string,
    categoryIcon: string,
    categoryColor: string,
    createdAt: Date,
    updatedAt: Date
}