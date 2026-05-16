import { Injectable } from '@angular/core';

export interface ProductCardModel {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  imageUrl?: string | null;
  categoryName?: string;
  badge?: string;
  reviewCount?: number;
  rating?: number;
  stock?: number;
  isActive: boolean;
  vendorId?: string;
}

export interface MockCategoryResponse {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  description?: string;
  children?: MockCategoryResponse[];
}

@Injectable({ providedIn: 'root' })
export class MockDataService {
  readonly categories: MockCategoryResponse[] = [
    {
      id: 'cat-1',
      name: 'Electronics',
      slug: 'electronics',
      isActive: true,
      description: 'Phones, laptops, gadgets',
      children: [
        {
          id: 'cat-1-1',
          name: 'Smartphones',
          slug: 'smartphones',
          isActive: true,
          children: [
            { id: 'cat-1-1-1', name: 'Android', slug: 'android', isActive: true, children: [] },
            { id: 'cat-1-1-2', name: 'iPhone', slug: 'iphone', isActive: true, children: [] },
          ],
        },
        { id: 'cat-1-2', name: 'Laptops', slug: 'laptops', isActive: true, children: [] },
        { id: 'cat-1-3', name: 'Accessories', slug: 'accessories', isActive: true, children: [] },
      ],
    },
    {
      id: 'cat-2',
      name: 'Fashion',
      slug: 'fashion',
      isActive: true,
      description: 'Clothing and footwear',
      children: [
        { id: 'cat-2-1', name: "Men's Clothing", slug: 'mens', isActive: true, children: [] },
        { id: 'cat-2-2', name: "Women's Clothing", slug: 'womens', isActive: true, children: [] },
        { id: 'cat-2-3', name: 'Footwear', slug: 'footwear', isActive: true, children: [] },
      ],
    },
    {
      id: 'cat-3',
      name: 'Home & Living',
      slug: 'home-living',
      isActive: true,
      description: 'Furniture and decor',
      children: [
        { id: 'cat-3-1', name: 'Furniture', slug: 'furniture', isActive: true, children: [] },
        { id: 'cat-3-2', name: 'Kitchen', slug: 'kitchen', isActive: true, children: [] },
      ],
    },
    {
      id: 'cat-4',
      name: 'Sports',
      slug: 'sports',
      isActive: true,
      description: 'Sports and outdoors',
      children: [],
    },
  ];

  readonly products: ProductCardModel[] = [
    {
      id: 'p-1',
      name: 'iPhone 15 Pro',
      price: 999,
      compareAtPrice: 1099,
      imageUrl: null,
      categoryName: 'Smartphones',
      badge: 'NEW',
      reviewCount: 128,
      rating: 4.8,
      stock: 15,
      isActive: true,
      vendorId: 'v-1',
    },
    {
      id: 'p-2',
      name: 'Samsung Galaxy S24',
      price: 849,
      imageUrl: null,
      categoryName: 'Smartphones',
      badge: 'SALE',
      reviewCount: 94,
      rating: 4.6,
      stock: 3,
      isActive: true,
      vendorId: 'v-1',
    },
    {
      id: 'p-3',
      name: 'MacBook Pro 14"',
      price: 1999,
      compareAtPrice: 2199,
      imageUrl: null,
      categoryName: 'Laptops',
      reviewCount: 67,
      rating: 4.9,
      stock: 8,
      isActive: true,
      vendorId: 'v-2',
    },
    {
      id: 'p-4',
      name: 'Nike Air Max 270',
      price: 129,
      imageUrl: null,
      categoryName: 'Footwear',
      badge: '-20%',
      reviewCount: 213,
      rating: 4.5,
      stock: 22,
      isActive: true,
      vendorId: 'v-3',
    },
    {
      id: 'p-5',
      name: 'Wireless Earbuds Pro',
      price: 79,
      compareAtPrice: 99,
      imageUrl: null,
      categoryName: 'Accessories',
      reviewCount: 156,
      rating: 4.3,
      stock: 0,
      isActive: false,
      vendorId: 'v-1',
    },
    {
      id: 'p-6',
      name: 'Coffee Maker Deluxe',
      price: 149,
      imageUrl: null,
      categoryName: 'Kitchen',
      reviewCount: 88,
      rating: 4.7,
      stock: 12,
      isActive: true,
      vendorId: 'v-2',
    },
    {
      id: 'p-7',
      name: 'Running Shorts',
      price: 39,
      imageUrl: null,
      categoryName: 'Sports',
      reviewCount: 45,
      rating: 4.1,
      stock: 30,
      isActive: true,
      vendorId: 'v-3',
    },
    {
      id: 'p-8',
      name: 'Dell XPS 15',
      price: 1799,
      compareAtPrice: 1999,
      imageUrl: null,
      categoryName: 'Laptops',
      badge: 'SALE',
      reviewCount: 51,
      rating: 4.7,
      stock: 5,
      isActive: true,
      vendorId: 'v-2',
    },
  ];

  readonly users = [
    {
      id: 'u-1',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      email: 'ahmed@example.com',
      roles: ['User'],
      isDisable: false,
      createdAt: '2024-01-15',
    },
    {
      id: 'u-2',
      firstName: 'Sara',
      lastName: 'Ali',
      email: 'sara@example.com',
      roles: ['Vendor'],
      isDisable: false,
      createdAt: '2024-02-10',
    },
    {
      id: 'u-3',
      firstName: 'Mohamed',
      lastName: 'Omar',
      email: 'mo@example.com',
      roles: ['Admin'],
      isDisable: false,
      createdAt: '2024-01-01',
    },
    {
      id: 'u-4',
      firstName: 'Layla',
      lastName: 'Nour',
      email: 'layla@example.com',
      roles: ['User'],
      isDisable: true,
      createdAt: '2024-03-05',
    },
    {
      id: 'u-5',
      firstName: 'Khaled',
      lastName: 'Farid',
      email: 'khaled@example.com',
      roles: ['Vendor'],
      isDisable: false,
      createdAt: '2024-03-20',
    },
  ];

  readonly adminStats = {
    totalUsers: 1247,
    newUsersThisMonth: 89,
    userGrowth: 12.4,
    totalProducts: 3421,
    activeProducts: 2987,
    productGrowth: 8.1,
    totalCategories: 48,
    totalVendors: 124,
    pendingVendors: 7,
    totalRevenue: 284750,
    revenueGrowth: 18.9,
    totalOrders: 8934,
    ordersGrowth: 22.1,
    pendingOrders: 143,
  };

  readonly vendorStats = {
    totalProducts: 24,
    activeProducts: 19,
    archivedProducts: 5,
    totalRevenue: 12450,
    revenueGrowth: 15.3,
    totalOrders: 287,
    pendingOrders: 12,
    totalReviews: 94,
    avgRating: 4.6,
    topProducts: ['iPhone 15 Pro', 'Samsung Galaxy S24', 'Wireless Earbuds Pro'],
    revenueByMonth: [4200, 5100, 3900, 6200, 7400, 8100, 5600, 9200, 7800, 10200, 8900, 12450],
  };

  readonly recentOrders = [
    {
      id: 'o-1',
      customerName: 'Ahmed Hassan',
      total: 999,
      status: 'Delivered',
      date: '2024-05-01',
      items: 1,
    },
    {
      id: 'o-2',
      customerName: 'Sara Ali',
      total: 228,
      status: 'Processing',
      date: '2024-05-02',
      items: 3,
    },
    {
      id: 'o-3',
      customerName: 'Layla Nour',
      total: 79,
      status: 'Shipped',
      date: '2024-05-03',
      items: 1,
    },
    {
      id: 'o-4',
      customerName: 'Khaled Farid',
      total: 1999,
      status: 'Pending',
      date: '2024-05-04',
      items: 2,
    },
    {
      id: 'o-5',
      customerName: 'Omar Saeed',
      total: 148,
      status: 'Cancelled',
      date: '2024-05-05',
      items: 2,
    },
  ];

  readonly attributes = [
    {
      id: 'a-1',
      name: 'Color',
      code: 'color',
      optionsType: 'Color',
      isActive: true,
      isFilterable: true,
      options: ['Red', 'Blue', 'Green', 'Black', 'White'],
    },
    {
      id: 'a-2',
      name: 'Size',
      code: 'size',
      optionsType: 'Size',
      isActive: true,
      isFilterable: true,
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'a-3',
      name: 'Material',
      code: 'material',
      optionsType: 'Text',
      isActive: true,
      isFilterable: false,
      options: ['Cotton', 'Polyester', 'Leather'],
    },
    {
      id: 'a-4',
      name: 'Brand',
      code: 'brand',
      optionsType: 'SingleSelect',
      isActive: true,
      isFilterable: true,
      options: ['Nike', 'Apple', 'Samsung', 'Dell'],
    },
  ];

  readonly pricePresets = [
    { label: 'Under $50', min: null, max: 50 },
    { label: '$50 – $100', min: 50, max: 100 },
    { label: '$100 – $500', min: 100, max: 500 },
    { label: 'Over $500', min: 500, max: null },
  ];

  readonly availableBrands = ['Apple', 'Samsung', 'Nike', 'Dell', 'Sony', 'LG'];

  readonly availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10'];

  readonly availableColors = [
    { name: 'Black', hex: '#111827' },
    { name: 'White', hex: '#F9FAFB' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Yellow', hex: '#F59E0B' },
    { name: 'Purple', hex: '#8B5CF6' },
  ];

  readonly recentActivity = [
    {
      id: 1,
      icon: '👤',
      iconBg: 'bg-blue-50',
      message: 'New user registered: Ahmed Hassan',
      time: '2 min ago',
    },
    {
      id: 2,
      icon: '📦',
      iconBg: 'bg-green-50',
      message: 'Order #8934 delivered successfully',
      time: '15 min ago',
    },
    {
      id: 3,
      icon: '🏪',
      iconBg: 'bg-amber-50',
      message: 'Vendor application from Sara Ali',
      time: '1 hour ago',
    },
    {
      id: 4,
      icon: '⭐',
      iconBg: 'bg-purple-50',
      message: 'New 5-star review on iPhone 15 Pro',
      time: '2 hours ago',
    },
    {
      id: 5,
      icon: '🔴',
      iconBg: 'bg-red-50',
      message: 'Product "Wireless Earbuds" out of stock',
      time: '3 hours ago',
    },
  ];

  readonly trustBadges = [
    { icon: '📦', text: 'Free shipping on orders over $100' },
    { icon: '🔄', text: '30-day easy returns' },
    { icon: '🛡', text: '2-year manufacturer warranty' },
    { icon: '🔒', text: 'Secure checkout' },
  ];

  readonly mockSuggestions = [
    'iPhone 15',
    'Samsung Galaxy',
    'Nike Shoes',
    'Laptop Dell XPS',
    'Coffee Maker',
  ];
}
