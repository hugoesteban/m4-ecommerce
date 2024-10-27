/// <reference types="multer" />
import { FileUploadRepository } from './file-upload.repository';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    private readonly productsRepository;
    constructor(fileUploadRepository: FileUploadRepository, productsRepository: Repository<Product>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<Product>;
}
