const { Wishlist, User, Products, WishlistedProducts } = require('../models');

exports.addWishlist = async (req, res) => {
    const { productName, uuid, productId, status, WishlistId } = req.body;
    try {
        const userId = await User.findOne({ where: { uuid } });
        if (status == '1') {
            const wishlists = await Wishlist.create({
                productName: productName,
                productId,
                userId: userId.id
            })
            if (wishlists) {
                const product = await Products.findOne({
                    where: { id: productId }
                })
                await product.addWishlist(wishlists).then(data => {
                    res.json({
                        statusCode: '1',
                        status: 'SUCCESS',
                        message: 'Successfully completed',
                        data
                    })
                }).catch(err => {
                    console.log("Wishlist adding Error occured======>", err)
                    res.json({
                        statusCode: '0',
                        status: 'FAILED',
                        message: 'Not completed'
                    })
                })
            } else {
                console.log("error happpend while wishlisting prooduct")
                res.json({
                    statusCode: '0',
                    status: 'FAILED',
                    meassage: 'Couldnt complete'
                })
            }
        } else {
            if (WishlistId !== '' && WishlistId !== undefined) {
                await Wishlist.destroy({
                    where: {
                        productId,
                        id: WishlistId,
                        userId: userId.id
                    }
                }).then(data => {
                    res.json({
                        data,
                        statusCode: '0',
                        status: 'SUCCESS',
                        message: 'Successfully completed'
                    })
                }).catch(err => {
                    console.log("err==>", err)
                    res.json({
                        statusCode: '1',
                        status: 'FAILED',
                        message: 'Failed to remove!!!'
                    })
                })
            } else {
                res.json({
                    statusCode: '1',
                    status: 'FAILED',
                    message: 'WhislistId must needed!!!'
                })
            }
        }
    } catch (err) {
        console.log("wishlist error inside try catch block", err)
        res.json({
            status: 'FAILED',
            meassage: 'Remote server unreachable'
        })
    }
}

exports.getAllWishlists = async (req, res) => {
    const { uuid } = req.body
    try {
        await User.findOne({
            attributes: {
                exclude: ['password', 'id']
            },
            where: { uuid },
            include: [{ model: Wishlist, as: 'wishlists' }]
        }).then(data => {
            res.json({
                status: 'SUCCESS',
                data,
            })
        })
            .catch(err => {
                console.log("Error inside try catch block", err)
                res.json({
                    status: 'FAILED',
                    message: 'Couldnt complete'
                })
            })
    } catch (err) {
        console.log("Error inside try catch block", err)
        res.json({
            status: 'SUCCESS',
            message: 'Remote server unreachable'
        })
    }
}