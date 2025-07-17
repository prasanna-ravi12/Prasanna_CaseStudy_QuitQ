package com.hexaware.QuitQ.service;

import java.util.List;
import com.hexaware.QuitQ.entity.WishlistItem;

public interface IWishlistService {
    WishlistItem addToWishlist(WishlistItem item);
    List<WishlistItem> getWishlist(String email);
    void removeFromWishlist(String email, int productId);
    void deleteFromWishlist(Integer id);
    

}
