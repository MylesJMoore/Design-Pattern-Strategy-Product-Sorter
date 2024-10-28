<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class Product {
    public $name;
    public $price;
    public $rating;
    public $date_added;

    public function __construct($name, $price, $rating, $date_added) {
        $this->name = $name;
        $this->price = $price;
        $this->rating = $rating;
        $this->date_added = $date_added;
    }
}

// Create a sample list of products
$products = [
    new Product("Laptop", 1500, 4.5, "2024-01-01"),
    new Product("Phone", 800, 4.7, "2024-01-10"),
    new Product("Headphones", 200, 4.3, "2024-01-05"),
    new Product("Monitor", 300, 4.6, "2024-01-07"),
];

// Define strategy interfaces
interface SortingStrategy {
    public function sort($products);
}

class SortByPrice implements SortingStrategy {
    public function sort($products) {
        usort($products, function($a, $b) {
            return $a->price - $b->price;
        });
        return $products;
    }
}

class SortByRating implements SortingStrategy {
    public function sort($products) {
        usort($products, function($a, $b) {
            return $b->rating - $a->rating;
        });
        return $products;
    }
}

class SortByDateAdded implements SortingStrategy {
    public function sort($products) {
        usort($products, function($a, $b) {
            return strtotime($a->date_added) - strtotime($b->date_added);
        });
        return $products;
    }
}

// Context class to handle dynamic strategy
class ProductSorter {
    private $strategy;

    public function __construct(SortingStrategy $strategy) {
        $this->strategy = $strategy;
    }

    public function setStrategy(SortingStrategy $strategy) {
        $this->strategy = $strategy;
    }

    public function sortProducts($products) {
        return $this->strategy->sort($products);
    }
}

// Handle user selection from frontend
$sortType = $_GET['sortType'] ?? 'price';
$sorter = new ProductSorter(new SortByPrice()); // Default sorting by price

switch ($sortType) {
    case 'price':
        $sorter->setStrategy(new SortByPrice());
        break;
    case 'rating':
        $sorter->setStrategy(new SortByRating());
        break;
    case 'date':
        $sorter->setStrategy(new SortByDateAdded());
        break;
    default:
        $sorter->setStrategy(new SortByPrice());
}

// Get sorted products
$sortedProducts = $sorter->sortProducts($products);

// Return the sorted products as JSON
echo json_encode($sortedProducts);
