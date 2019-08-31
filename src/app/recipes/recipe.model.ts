export interface Recipe{
    id: string;
    title: string;
    imageUrl: string;
    videoUrl?: string;
    description: string;
    ingredients: string[];
}
