 Server: localhost  -   Database: ass_cloudcomputingdb
 
-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 29, 2016 at 06:45 PM
-- Server version: 5.1.37
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `ass_cloudcomputingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_tb`
--

CREATE TABLE IF NOT EXISTS `category_tb` (
  `id_cate` int(11) NOT NULL AUTO_INCREMENT,
  `name_cate` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cate`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `category_tb`
--

INSERT INTO `category_tb` (`id_cate`, `name_cate`) VALUES
(1, 'mobile'),
(2, 'laptop'),
(3, 'tablet'),
(7, 'battery'),
(8, 'hdd'),
(9, 'ram');

-- --------------------------------------------------------

--
-- Table structure for table `product_tb`
--

CREATE TABLE IF NOT EXISTS `product_tb` (
  `id_pro` int(11) NOT NULL AUTO_INCREMENT,
  `id_cate` int(11) NOT NULL,
  `name_pro` varchar(50) NOT NULL,
  `desc_pro` varchar(100) NOT NULL,
  `price_pro` int(11) NOT NULL,
  PRIMARY KEY (`id_pro`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `product_tb`
--

INSERT INTO `product_tb` (`id_pro`, `id_cate`, `name_pro`, `desc_pro`, `price_pro`) VALUES
(10, 8, 'hdd western 2T', 'blue 2TB, 7200 rpm', 2000),
(9, 9, 'ram kington 4g ddr3', 'ddr3 kingtom 4g', 500),
(8, 2, 'hp sleekbook 14', '14 inches, black, hdd 500g, vga 1g', 10000),
(7, 1, 'samsung e5', '5 inches, white 16G', 4700),
(11, 7, 'pin laptop hp 14', 'for hp sleekbook 14', 900);

--
-- Table structure for table `customer_tb`
--

CREATE TABLE IF NOT EXISTS `customer_tb` (
  `id_cus` int(11) NOT NULL AUTO_INCREMENT,
  `name_cus` varchar(50) NOT NULL,
  `address_cus` varchar(100) NOT NULL,
  `phone_cus` varchar(15) NOT NULL,
  `email_cus` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cus`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `customer_tb`
--

INSERT INTO `customer_tb` (`id_cus`, `name_cus`, `address_cus`, `phone_cus`, `email_cus`) VALUES
(1, 'Tong Phuoc Hung', '408/47 Trung Nu Vuong - Da Nang', '0904744343', 'hungtppd01152@fpt.edu.vn'),
(2, 'Tran Thi Nguyet', '408/47 Trung Nu Vuong - Da Nang', '09053883051', 'nguyetlao@gmail.com'),
(3, 'Vuong Huu Hung', '61 Dong Da - Q.1 - HCM', '0918787288', 'francishungss@hotmail.com'),
(4, 'Francis Hung', '70 Le Dinh Ly - Cau Giay - Ha Noi', '09388087822', 'hungfrancisjs2@yahoo.com'),
(5, 'Mark Zuckerberg', '62 Hoang Dieu - Hai Chau - Da Nang', '0948982666', 'markdanang@facebook.com');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_tb`
--

CREATE TABLE IF NOT EXISTS `invoice_tb` (
  `id_invoice` int(11) NOT NULL AUTO_INCREMENT,
  `id_cus` int(11) NOT NULL,
  `date_invoice` varchar(10) NOT NULL,
  PRIMARY KEY (`id_invoice`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `invoice_tb`
--

INSERT INTO `invoice_tb` (`id_invoice`, `id_cus`, `date_invoice`) VALUES
(1, 1, '05/06/2016'),
(2, 3, '10/06/2016'),
(3, 5, '15/06/2016');

-- --------------------------------------------------------

--
-- Table structure for table `invoicedetail_tb`
--

CREATE TABLE IF NOT EXISTS `invoicedetail_tb` (
  `id_invoicedetail` int(11) NOT NULL AUTO_INCREMENT,
  `id_invoice` int(11) NOT NULL,
  `id_pro` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id_invoicedetail`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `invoicedetail_tb`
--

INSERT INTO `invoicedetail_tb` (`id_invoicedetail`, `id_invoice`, `id_pro`, `quantity`) VALUES
(1, 1, 11, 1),
(2, 1, 7, 1),
(3, 1, 10, 2),
(4, 2, 8, 2),
(5, 2, 9, 5),
(6, 3, 7, 3);

-- --------------------------------------------------------

