import { Request, Response } from 'express'
import {
    handleError,
    parseParams,
    parseQuery,
    readProductsFile,
} from '../utils'

/**DOCU:
 * - fetches all products
 * ************************************************************
 */
export const getAll = async (req: Request, res: Response) => {
    try {
        const products = await readProductsFile()

        const { limit, skip } = await parseQuery(req.query)

        const currentProducts = products.slice(skip, skip + limit)

        res.status(200).json({
            limit,
            skip,
            totalProducts: products.length,
            products: currentProducts,
        })
    } catch (error) {
        handleError(res, error as Error)
    }
}

/**DOCU:
 * - fetches a product by id
 * ************************************************************
 */
export const getOneById = async (req: Request, res: Response) => {
    try {
        const { productId } = parseParams(req.params)

        const products = await readProductsFile()

        if (isNaN(productId)) {
            throw new Error('Invalid product id')
        }

        if (productId < 0 || productId > products.length) {
            throw new Error('Product does not exist')
        }

        const product = products.find((item) => item.id === productId)

        res.status(200).json(product)
    } catch (error) {
        handleError(res, error as Error)
    }
}

/**DOCU:
 * - fetches products by title
 * ************************************************************
 */
export const getManyByTitle = async (req: Request, res: Response) => {
    try {
        const products = await readProductsFile()

        const { limit, skip, name } = await parseQuery(req.query)

        const filteredByTitle = products.filter((product) =>
            product.title.toLowerCase().includes(name.toLowerCase())
        )

        const currentProducts = filteredByTitle.slice(skip, skip + limit)

        res.status(200).json({
            limit,
            skip,
            totalProductsQueried: filteredByTitle.length,
            products: currentProducts,
        })
    } catch (error) {
        handleError(res, error as Error)
    }
}

/**DOCU:
 * - fetches many products by price range
 * ************************************************************
 */
export const getManyByPriceRange = async (req: Request, res: Response) => {
    try {
        const { limit, skip, minPrice, maxPrice } = await parseQuery(req.query)

        const products = await readProductsFile()

        const filteredByProductsPriceRange = products.filter(
            (product) => product.price > minPrice && product.price <= maxPrice
        )

        const currentProducts = filteredByProductsPriceRange.slice(
            skip,
            skip + limit
        )

        res.status(200).json({
            limit,
            skip,
            totalProductsQueried: filteredByProductsPriceRange.length,
            products: currentProducts,
        })
    } catch (error) {
        handleError(res, error as Error)
    }
}

/**DOCU:
 * - fetches many products by brand name
 * ************************************************************
 */
export const getManyByBrand = async (req: Request, res: Response) => {
    try {
        const products = await readProductsFile()

        const { limit, skip, name } = await parseQuery(req.query)

        const filteredByBrand = products.filter((product) =>
            product.brand.toLowerCase().includes(name.toLowerCase())
        )

        const currentProducts = filteredByBrand.slice(skip, skip + limit)

        res.status(200).json({
            limit,
            skip,
            totalProductsQueried: filteredByBrand.length,
            products: currentProducts,
        })
    } catch (error) {
        handleError(res, error as Error)
    }
}

/**DOCU:
 * - fetches all in stock
 * ************************************************************
 */
export const getAllInStock = async (req: Request, res: Response) => {
    try {
        const products = await readProductsFile()

        const { limit, skip } = await parseQuery(req.query)

        const filteredByStock = products.filter((product) => product.stock > 0)

        const currentProducts = filteredByStock.slice(skip, skip + limit)

        res.status(200).json({
            limit,
            skip,
            totalProductsQueried: filteredByStock.length,
            products: currentProducts,
        })
    } catch (error) {
        handleError(res, error as Error)
    }
}

/**DOCU:
 * - fetches many products by rating range
 * ************************************************************
 */
export const getManyByRatingRange = async (req: Request, res: Response) => {
    try {
        const { limit, skip, minRating, maxRating } = await parseQuery(
            req.query
        )

        const products = await readProductsFile()

        const filteredByProductsRatingRange = products.filter(
            (product) =>
                product.rating > minRating && product.rating <= maxRating
        )

        const currentProducts = filteredByProductsRatingRange.slice(
            skip,
            skip + limit
        )

        res.status(200).json({
            limit,
            skip,
            totalProductsQueried: filteredByProductsRatingRange.length,
            products: currentProducts,
        })
    } catch (error) {
        handleError(res, error as Error)
    }
}
