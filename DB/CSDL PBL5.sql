-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 16, 2024 lúc 05:59 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `pbl5`
--
CREATE DATABASE IF NOT EXISTS `pbl5` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `pbl5`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `animals`
--

CREATE TABLE `animals` (
  `IDAnimal` int(11) NOT NULL,
  `AnimalName` text NOT NULL,
  `AnimalScientificName` text NOT NULL,
  `IDDetail` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `animals`
--

INSERT INTO `animals` (`IDAnimal`, `AnimalName`, `AnimalScientificName`, `IDDetail`) VALUES
(1, 'Báo Gấm', 'Neofelis nebulosa', 1),
(2, 'Gà lôi lam mào trắng', 'Lophura hatinhensis', 2),
(3, 'Bướm phượng cánh kiếm', 'Graphium antiphates', 3),
(4, 'Hạc cổ trắng', 'Ciconia episcopus', 4),
(5, 'Đồi mồi', 'Eretmochelys imbricata', 5),
(6, 'Công lục Đông Dương', 'Pavo muticus', 6),
(7, 'Cá nhám voi', 'Rhincodon typus', 7),
(8, 'Mèo cá', 'Prionailurus viverrinus', 8),
(9, 'Rái cá lông mượt', 'Lutrogale perspicillata', 9),
(10, 'Mòng biển mỏ ngắn', 'Saundersilarus saundersi', 10),
(11, 'Cú lợn rừng phương Đông', 'Phodilus badius', 11),
(12, 'Cheo cheo Napu', 'Tragulus napu', 12),
(13, 'Bồ câu Nicoba', 'Caloenas nicobarica nicobarica', 13),
(14, 'Chim trĩ đầu đen', 'Ardeotis nigriceps', 14);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `animal_album`
--

CREATE TABLE `animal_album` (
  `IDAnimalAlbum` int(11) NOT NULL,
  `IDAnimal` int(11) NOT NULL,
  `ImageLink` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `animal_album`
--

INSERT INTO `animal_album` (`IDAnimalAlbum`, `IDAnimal`, `ImageLink`) VALUES
(1, 1, 'https://th.bing.com/th/id/R.8123ce20ff5b06a0d76fb31e62e55214?rik=8rML1MLH3KFbUg&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f14%2f96%2fL7ECsb.jpg&ehk=LgMLGcTs2gr5H6bLczAQSjC3ZnaGr0SwEaySRcMW2s4%3d&risl=&pid=ImgRaw&r=0'),
(2, 1, 'https://bing.com/th?id=OIP.kGYXo1pa-Qz1R_iFcXOKowHaIv'),
(3, 1, 'https://bing.com/th?id=OIP.mmfxwrJMGJwUG1N4jh5NJwHaJh'),
(4, 1, 'https://bing.com/th?id=OIP.lpFC2TQA9aK1r6OktTaAiwHaEe'),
(5, 1, 'https://bing.com/th?id=OIP.L_-ufkmzDwPbcHIZFod6UQHaGS'),
(6, 1, 'https://bing.com/th?id=OIP.vWMPAWkymOB36tCqMQk5rQHaE6'),
(7, 1, 'https://bing.com/th?id=OIP.ENqxQcN6hVaKm6An6bsHPQHaEq'),
(8, 2, 'https://bing.com/th?id=OIP.WlXen2OAOKKgN3NEtHZR0gHaFj'),
(9, 2, 'https://bing.com/th?id=OIP.kWXSzLUwueERnV52ONQ2ygHaFj'),
(10, 2, 'https://www.bing.com/th?id=OIP.f9mXs_UZ0pgXbdWRNyxRBQHaE8&w=144&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(11, 2, 'https://www.bing.com/th?id=OIP.p65_cBQmKCQwkGLO3mRQZwHaEq&w=154&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(12, 2, 'https://www.bing.com/th?id=OIP.Bho2IiNeLMuCRujIaUAzGgHaFj&w=138&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(13, 3, 'https://www.bing.com/th?id=OIP.qra7iWo0HqF4_v1FsJIOswHaE8&w=147&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(14, 3, 'https://www.bing.com/th?id=OIP.020TBVFuibbPvP8afgkFnwAAAA&w=147&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(15, 3, 'https://www.bing.com/th?id=OIP.DYuH_gWFOHu830FlEXNcJAHaF0&w=134&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(16, 3, 'https://www.bing.com/th?id=OIP.DAivSW8Q5xoD-6E70EyoagHaFF&w=142&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'),
(17, 3, 'data:image/jpeg;base64,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'),
(18, 4, 'https://th.bing.com/th/id/OIP.zYoam7SpGrqIFbFZtcA7jgAAAA?rs=1&pid=ImgDetMain'),
(19, 4, 'https://www.zoochat.com/community/media/asian-woolly-necked-stork.374855/full?d=1505131481'),
(20, 4, 'https://th.bing.com/th/id/OIP.zeQHN_L8KjTpHVyvAlLMMgAAAA?rs=1&pid=ImgDetMain'),
(21, 4, 'https://www.zoochat.com/community/media/woolly-necked-stork-ciconia-episcopus.497823/full?d=1598210655'),
(22, 4, 'https://th.bing.com/th/id/R.48f1d2921b6a53b0542ec89b2913c1e5?rik=Nn3m12eBom8z3w&riu=http%3a%2f%2fwildart.in%2fcache%2fstorks-ciconiidae%2fwoolly-necked-stork%2fwoolly_necked_storkimg_1467_595_thumb.jpg%3fcached%3d1618728426&ehk=3o9uXNghyNH6Q6yyHlGZXnzheisTjTnV3zo1c7XUJUU%3d&risl=&pid=ImgRaw&r=0'),
(23, 5, 'https://i.natgeofe.com/n/67e1d98f-e966-41ce-b050-928a54801be6/6626043.jpg'),
(24, 5, 'https://hakaimagazine.com/wp-content/uploads/header-sea-turtle-trade.jpg'),
(25, 5, 'https://th.bing.com/th/id/R.d6de2f784abb8d920d38141a002a3bbd?rik=QWLebWP42%2bGxxw&riu=http%3a%2f%2fd.ibtimes.co.uk%2fen%2ffull%2f1426691%2fhawksbill-turtle.jpg%3fw%3d736&ehk=ZONXwDWssO%2bx1FhAh%2bSnHaNNF%2fBNmvVooiyWgoxbeDg%3d&risl=&pid=ImgRaw&r=0'),
(26, 5, 'https://wildlifeact.com/wp-content/uploads/2016/07/Hawksbill-Banner.jpg'),
(27, 5, 'https://cff2.earth.com/uploads/2019/01/30133840/Critically-endangered-turtle-is-being-poached-for-jewelry.jpg'),
(28, 6, 'https://www.thainationalparks.com/img/species/2020/08/18/396006/green-peafowl-w-1500.jpg'),
(29, 6, 'https://i.pinimg.com/originals/76/f8/c6/76f8c65b8622429527ab3e92c2bb35f7.jpg'),
(30, 6, 'https://www.worldatlas.com/r/w1200/upload/5f/ef/37/shutterstock-540208372.jpg'),
(31, 6, 'https://petkeen.com/wp-content/uploads/2021/02/Green-Peafowl.jpg'),
(32, 6, 'https://i.pinimg.com/originals/0a/90/f5/0a90f5a20d50021f2ad75da6ce9c8dcf.jpg'),
(33, 7, 'https://img.jakpost.net/c/2018/05/09/2018_05_09_45618_1525843092._large.jpg'),
(34, 7, 'https://www.thoughtco.com/thmb/hwbgklkIM_VSlQ2LunDA1j1Wvuo=/4368x2912/filters:no_upscale():max_bytes(150000):strip_icc()/lil-baby-whaleshark-127616498-572550545f9b589e34de9855.jpg'),
(35, 7, 'https://th.bing.com/th/id/R.ccab9ebf42b18e63bff40690147f76f0?rik=630w720uKCS5hw&riu=http%3a%2f%2fwww.bekaretransfers.com%2fblog%2fwp-content%2fuploads%2f2017%2f05%2fwhaleshark.jpeg&ehk=YlUWGY0Rd4cfUwVfoYPnE0NTyuwlwzY5wgq3SLN0Sds%3d&risl=1&pid=ImgRaw&r=0'),
(36, 7, 'https://images.newscientist.com/wp-content/uploads/2020/04/03222259/pbae38_web.jpg'),
(37, 7, 'https://th.bing.com/th/id/R.858f849f9a4ac58a96e6c5ec2b24d0f1?rik=cbqr95ikipCXJw&riu=http%3a%2f%2fassets.worldwildlife.org%2fphotos%2f2099%2fimages%2fhero_full%2fWhale-Shark-Homepage.jpg%3f1345610209&ehk=%2f4CqJcmSNgm9n8u1UOrTLkElFinP3uO70YKUnI%2ffn%2fk%3d&risl=&pid=ImgRaw&r=0'),
(38, 8, 'https://th.bing.com/th/id/OIP.g5Bu5OrTvb3a8TUzmBWqEQAAAA?rs=1&pid=ImgDetMain'),
(39, 8, 'https://animals.sandiegozoo.org/sites/default/files/inline-images/fishing_cat02.jpg'),
(40, 8, 'https://www.zoo-leipzig.de/fileadmin/_processed_/f/5/csm_Fischkatze_5_10dd768a9b.jpg'),
(41, 8, 'https://hakaimagazine.com/wp-content/uploads/header-fishing-cats.jpg'),
(42, 8, 'https://nationalzoo.si.edu/sites/default/files/animals/20110217-116mm.jpg'),
(43, 9, 'https://th.bing.com/th/id/OIP.QhoBq-2qQVVpux8sAAGf6QHaHa?rs=1&pid=ImgDetMain'),
(44, 9, 'https://static.thainationalparks.com/img/species/2015/07/21/156501/lutrogale-perspicillata-smooth-coated-otter-2-w-1500.jpg'),
(45, 9, 'https://th.bing.com/th/id/R.365d005de399083a69d7c6de13e0a148?rik=PAJ%2fZx14D4Yk1A&riu=http%3a%2f%2fwww.timplowden.co.uk%2fwp-content%2fuploads%2f2017%2f08%2fMG_2964-ps.jpg&ehk=DTkTycPDubH3jphKEtxZ1wrcqYwV7cYZt6hascINdwU%3d&risl=&pid=ImgRaw&r=0'),
(46, 9, 'https://st3.depositphotos.com/1882219/15386/i/950/depositphotos_153863224-stock-photo-smooth-coated-otter-lutrogale-perspicillata.jpg'),
(47, 9, 'https://www.zoochat.com/community/media/smooth-coated-otter-lutrogale-perspicillata.198635/full?d=1346186445'),
(48, 10, 'https://focusingonwildlife.com/news/wp-content/gallery/saunderss-gull-chroicocephalus-saundersi-vu/saunderss-gull-breeding-crab-chroicocephalus-saundersi-john-a-wright-4367.jpg'),
(49, 10, 'https://live.staticflickr.com/238/31219865780_38245ed2a7_b.jpg'),
(50, 10, 'https://live.staticflickr.com/1445/23891361069_9d1e8a7a03_b.jpg'),
(51, 10, 'https://live.staticflickr.com/749/31219865570_b926b5643f_b.jpg'),
(52, 10, 'https://focusingonwildlife.com/news/wp-content/gallery/saunderss-gull-chroicocephalus-saundersi-vu/saunderss-gull-breeding-crab-chroicocephalus-saundersi-john-a-wright-4299.jpg'),
(53, 10, 'https://www.oiseaux.net/photos/franck.ambrosini/images/mouette.de.saunders.fram.1g.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_animal`
--

CREATE TABLE `detail_animal` (
  `IDDetail` int(11) NOT NULL,
  `Appearance` text NOT NULL,
  `Habits` text NOT NULL,
  `Continents` text NOT NULL,
  `Countries` text NOT NULL,
  `WwfBiomes` text NOT NULL,
  `LevelOfDanger` text NOT NULL,
  `TheRemainAmount` text NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `detail_animal`
--

INSERT INTO `detail_animal` (`IDDetail`, `Appearance`, `Habits`, `Continents`, `Countries`, `WwfBiomes`, `LevelOfDanger`, `TheRemainAmount`, `status`) VALUES
(1, 'Báo gấm có vẻ ngoài nổi bật với những đốm lớn màu xám sẫm cùng những đốm và sọc không đều giống như những đám mây. Chiều dài đầu và thân của nó dao động từ 68,6 đến 108 cm (27,0 đến 42,5 inch) và có đuôi dài 61 đến 91 cm (24 đến 36 inch). Chúng sử dụng chiếc đuôi dài của mình để giữ thăng bằng khi di chuyển qua cây và thậm chí có khả năng trèo xuống những thân cây thẳng đứng bằng đầu trước.', 'Báo mây chủ yếu hoạt động về đêm, săn mồi vào ban đêm trên nền rừng. Vào ban ngày, nó nghỉ ngơi trên cây, khiến nó trở thành loài sống trên cây lão luyện. Không giống như một số loài mèo lớn khác, báo gấm không thể gầm gừ hay gầm gừ, xếp nó vào một hạng mục độc nhất.', 'Từ chân dãy Himalaya qua Đông Bắc Ấn Độ và Bhutan. Nó kéo dài đến lục địa Đông Nam Á và vào Nam Trung Quốc.', 'Thật không may, nó đã tuyệt chủng cục bộ ở Singapore, Đài Loan và có thể cả đảo Hải Nam và Việt Nam.', 'Rừng lá rộng ẩm nhiệt đới và cận nhiệt đới.', 'Vulnerable', 'Tổng số ít hơn 10.000 loài trưởng thành, mỗi nhóm không quá 1.000 loài', 'Bị đe dọa bởi săn bắn và buôn bán bất hợp pháp cho da và y học dân gian.'),
(2, 'Gà lôi Việt Nam đực có màu xanh đậm với lông màu xanh lá cây trên cánh, trong khi con cái có màu nâu sẫm với chân và mặt màu đỏ.', 'Gà lôi Việt Nam sinh sống ở rừng thường xanh nguyên sinh và thứ sinh ở vùng đất thấp và đồi núi. Nó có thể chịu được sự suy thoái môi trường sống nhưng phổ biến hơn ở các khu rừng có tán che phủ. Nó đã bị mắc kẹt trong thảm thực vật dày đặc ven suối.', 'Châu Á', 'Vietnam', 'Gà lôi Việt Nam sống ở nhiều quần xã sinh vật khác nhau, bao gồm rừng thường xanh và rừng khai thác.', 'Endangered', 'không xác định', 'Cực kỳ nguy cơ bởi săn bắn và mất môi trường sống.'),
(3, 'Màu nền của mặt trên của cả con đực và con cái đều có màu trắng.\r\nCánh trước có tế bào được cắt ngang bởi năm dải màu đen ngắn.\r\nCánh sau có ba phần tư cơ bản màu trắng đồng nhất, với các mảng màu đen ở mặt dưới lộ ra ngoài.\r\nĐuôi có màu xám đen, có viền và chóp màu trắng.', 'Bướm phượng cánh kiếm được biết đến với thiết kế cánh độc đáo, nổi bật với năm vạch màu xanh lam riêng biệt trên đôi cánh chủ yếu là màu đen. Với sải cánh thường từ 55 đến 80 mm, nó làm say lòng những người đam mê bướm', 'Nam Á và Đông Nam Á', 'Nó sinh sống ở một số quốc gia trong khu vực này', 'Có thể được tìm thấy trong các quần xã sinh vật khác nhau, bao gồm cả rừng nhiệt đới và cận nhiệt đới.', 'Extinct', 'Không có dữ liệu cụ thể về quy mô dân số.', 'Mặc dù không bị chú trọng đặc biệt, mất môi trường sống có thể ảnh hưởng gián tiếp đến các quần thể.'),
(4, 'Hạc cổ trắng châu Á là loài cò cỡ trung bình, cao 75–92 cm.\r\nNó có chiếc cổ xù màu trắng đặc biệt, cái đuôi màu trắng và mỏ có màu sẫm màu cá hồi.\r\nBộ lông tổng thể có màu đen lấp lánh với “nắp sọ” màu đen.\r\nNhững chiếc lông ở cổ trước có màu óng ánh với tông màu tím đồng và những chiếc lông này có thể dựng đứng khi trưng bày.', 'Hạc cổ trắng châu Á sinh sản đơn lẻ hoặc thành đàn nhỏ rời rạc. Nó sinh sống ở nhiều môi trường sống khác nhau, bao gồm đầm lầy trong rừng, khu vực nông nghiệp và vùng đất ngập nước ngọt.', 'Tìm thấy trên khắp châu Á', 'Phạm vi của nó bao gồm Ấn Độ đến Đông Dương, Philippines, Bán đảo Mã Lai, phía bắc Sumatra, phía nam Sumatra, Java, Quần đảo Sunda nhỏ hơn và Sulawesi.', 'Các quần xã WWF cụ thể liên quan đến loài cò này không được đề cập', 'Least Concern', 'Không có dữ liệu cụ thể về quy mô dân số', 'Bị săn bắn vì mục đích buôn bán, nhưng quần thể tương đối ổn định.'),
(5, 'Rùa biển đồi mồi có hình dạng cơ thể dẹt, mai bảo vệ và các chi giống chân chèo thích nghi với việc bơi lội ở vùng biển khơi.\r\nNó có thể dễ dàng được phân biệt bằng chiếc mỏ cong, sắc nhọn với hình dáng tomium nổi bật và hình dạng giống như cái cưa ở mép vỏ của nó.\r\nMàu sắc vỏ thay đổi một chút tùy theo nhiệt độ nước.', 'Rùa đồi mồi dành một phần cuộc đời của chúng ở vùng biển khơi nhưng cũng thường xuyên ở các đầm phá nông và rạn san hô.', 'Được tìm thấy trên khắp vùng biển nhiệt đới của Đại Tây Dương, Thái Bình Dương và Ấn Độ Dương.', 'Phạm vi của nó bao gồm nhiều quốc gia khác nhau trong các khu vực này.', 'Các quần xã sinh vật WWF cụ thể liên quan đến loài rùa này không được đề cập.', 'Extinct', 'Không có dữ liệu cụ thể về quy mô dân số.', 'Cực kỳ nguy cơ do săn bắn vì vỏ.'),
(6, 'Cả Công xanh đực và mái đều có bộ lông dài phủ kín đuôi trên.\r\nỞ con đực, những chiếc lông này dài tới 2 mét (6,6 feet) và được trang trí bằng các đốm mắt.\r\nCon cái có bộ lông màu xanh lá cây ngắn hơn, chỉ che đuôi.\r\nLông cổ và lông ngực của cả hai giới đều có màu xanh lục óng ánh, giống với vảy rồng Trung Quốc.\r\nCon đực có các lớp phủ cánh màu xanh lam, ở giữa và lớn hơn, trong khi các lớp phủ cánh nhỏ hơn có màu xanh lá cây, tạo thành một hình tam giác gồm các lông vai có vảy khi đóng cánh.\r\nCác con thứ cấp có màu đen và ở một số phân loài, các con thứ ba có thể có màu nâu và/hoặc có vạch.\r\nCon cái có bộ lông màu xanh nhạt hơn và không có hình tam giác ở vai cánh.\r\nCả hai giới đều có lông mào, chân dài, cánh nặng và hình dáng đuôi dài.\r\nDa mặt có sọc đôi màu trắng xanh, bên tai có hình lưỡi liềm màu vàng cam.\r\nHình tam giác sẫm màu bên dưới mắt có màu xanh lục ở con đực và màu nâu ở con cái.', 'Công xanh là loài chim rừng sống trên hoặc gần mặt đất trong các đám cỏ cao và cói.\r\nChúng đậu trên cây vào ban đêm, thường ở độ cao 10–15 mét (33–49 feet).\r\nBan ngày chúng kiếm ăn trên mặt đất, uống nước, rỉa lông và nghỉ ngơi trong bóng râm.', 'Công xanh có nguồn gốc từ các khu rừng nhiệt đới ở Đông Nam Á và Đông Dương.', 'Trước đây chúng phổ biến khắp Đông Nam Á, nhưng hiện nay chỉ còn một số quần thể biệt lập còn tồn tại ở Campuchia (chủ yếu ở các tỉnh phía Bắc và phía Đông) và các khu vực lân cận của Việt Nam.', 'Các quần xã sinh vật WWF cụ thể liên quan đến Công xanh không được đề cập.', 'Endangered', 'Không có dữ liệu cụ thể về quy mô dân số.', 'Bị săn bắn vì lông và thịt, dẫn đến suy giảm dân số.'),
(7, 'Cá nhám voi là loài cá lớn nhất còn tồn tại được biết đến.\r\nCá thể lớn nhất được xác nhận có chiều dài 18,8 mét (61,7 feet).\r\nNó có cái đầu rộng, dẹt với cái miệng lớn và hai con mắt nhỏ nằm ở góc trước.\r\nKhông giống như nhiều loài cá mập khác, miệng cá mập voi nằm ở phía trước đầu chứ không phải ở mặt dưới.\r\nDa của chúng có màu xám đen với những mảng màu vàng nhạt đặc biệt có hình bàn cờ.\r\nNhững đốm sáng đánh dấu vây và vùng tối của cơ thể.\r\nĐầu rộng và phẳng, mõm hơi cụt và cái miệng rộng.\r\nCác miếng lọc bên trong khe mang được sử dụng để cho ăn.', 'Cá nhám voi sống ở vùng nước ấm trên khắp thế giới.\r\nChúng được tìm thấy ở phía tây Đại Tây Dương, phía đông Đại Tây Dương, Ấn Độ Dương, phía tây và trung tâm Thái Bình Dương.\r\nChúng hầu như chỉ ăn sinh vật phù du và các loài cá nhỏ và không gây nguy hiểm cho con người.', 'Được tìm thấy trong môi trường biển trên toàn thế giới, chủ yếu ở các đại dương nhiệt đới.', 'Chúng xảy ra ở nhiều quốc gia khác nhau trong phạm vi của chúng.', 'Các quần xã sinh vật WWF cụ thể liên quan đến cá mập voi không được đề cập.', 'Endangered', 'Không có dữ liệu cụ thể về quy mô dân số.', 'Dễ bị săn bắn vì vây và dầu gan.'),
(8, 'Mèo cá là một loài mèo hoang dã cỡ trung bình sống ở Nam và Đông Nam Á.\r\nNó có bộ lông màu xám vàng đậm với những đường và đốm đen.\r\nCon trưởng thành có chiều dài từ đầu đến thân từ 57 đến 78 cm (22 đến 31 inch), với đuôi dài 20 đến 30 cm (7,9 đến 11,8 inch).\r\nCon đực lớn hơn con cái, nặng từ 8 đến 17 kg (18 đến 37 lb); con cái nặng trung bình từ 5 đến 9 kg (11 đến 20 lb).', 'Mèo cá sống chủ yếu ở vùng lân cận vùng đất ngập nước, dọc theo sông, suối, hồ bò, trong đầm lầy và rừng ngập mặn.\r\nCon mồi chính của chúng là cá, nhưng chúng cũng ăn chim, côn trùng, loài gặm nhấm nhỏ, động vật thân mềm, bò sát (bao gồm cả rắn và động vật lưỡng cư) và xác của gia súc nuôi.\r\nChúng được cho là hoạt động chủ yếu về đêm và bơi giỏi, có khả năng bơi đường dài, thậm chí dưới nước.', 'Được tìm thấy ở Nam và Đông Nam Á.', 'Phạm vi của họ bao gồm các quốc gia như Bangladesh, Campuchia, Ấn Độ, Myanmar, Nepal, Pakistan, Sri Lanka và Thái Lan.', 'Các quần xã WWF cụ thể liên quan đến Mèo Câu cá không được đề cập.', 'Vulnerable', 'Tính đến năm 2015, ước tính có khoảng 10.000 cá thể còn sống.', 'Bị săn bắn vì lông của mình và ngày càng bị đe dọa do mất môi trường sống.'),
(9, 'Rái cá có bộ lông mịn có bộ lông ngắn, bóng mượt, màu nâu sẫm đến nâu đỏ dọc theo lưng, với màu nâu xám nhạt hơn ở mặt dưới.\r\nNó được phân biệt với các loài rái cá khác bởi cái đầu “tròn” hơn và chiếc mũi không có lông, hình kim cương.\r\nĐuôi dẹt, trái ngược với đuôi tròn hoặc hình trụ của các loài rái cá khác.\r\nChân ngắn và khỏe, bàn chân to có màng mang móng vuốt khỏe và sắc để xử lý cá trơn.\r\nRái cá lông mịn là loài rái cá tương đối lớn, nặng từ 7–11 kg (15–24 lb) và có chiều dài từ đầu đến thân khoảng 59–64 cm (23–25 in) với chiều dài cơ thể là 37–43 cm (15). –17 in) đuôi dài.\r\nCon cái có hai cặp núm vú để chúng nuôi những lứa nhỏ gồm nhiều con non.', 'Rái cá có bộ lông mượt hầu hết được tìm thấy ở vùng đất thấp, rừng ngập mặn ven biển, rừng đầm lầy than bùn, vùng đất ngập nước ngọt, sông, hồ và cánh đồng lúa có rừng lớn.\r\nChúng đều thoải mái như nhau trên đất liền và có thể di chuyển quãng đường dài trên đất liền để tìm kiếm môi trường sống thích hợp.\r\nChúng trú ẩn trong các hang nông và đống đá hoặc lũa.\r\nMột số xây hang cố định gần mặt nước với lối vào dưới nước và đường hầm dẫn đến một căn phòng phía trên mực nước cao, tương tự như hải ly Mỹ.\r\nỞ Malaysia, rái cá lông mịn có nhiều ở rừng ngập mặn hơn ở hệ thống sông.', 'Được tìm thấy ở hầu hết miền nam châu Á, từ Ấn Độ về phía đông. Ngoài ra còn có một quần thể biệt lập được tìm thấy ở vùng đầm lầy ở Iraq.', 'Phạm vi của họ bao gồm các quốc gia ở Nam và Tây Nam Á.', 'Các quần xã sinh vật WWF cụ thể liên quan đến rái cá có bộ lông mịn không được đề cập.', 'Vulnerable', 'Không có dữ liệu cụ thể về quy mô dân số', 'Dễ bị săn bắn và phá hủy môi trường sống.'),
(10, 'Con trưởng thành có mũ trùm đầu và gáy màu đen trong mùa sinh sản.\r\nChúng rất nhợt nhạt, thân màu trắng, đôi cánh màu xám nhạt và dải đuôi hẹp màu đen.\r\nChân và mỏ ngắn có màu đen, thân hình ngồi xổm.\r\nNhững con chim không sinh sản có mũ và gáy màu xám lốm đốm, với đôi cánh có đầu màu trắng và các vết đen trên các lông sơ bộ.', 'Mòng biển Saunders bắt con mồi bằng cách bay trên mặt đất và nhanh chóng thả xuống những con mồi thích hợp, bao gồm cá thòi lòi, cua, cá và giun.\r\nNó cũng là loài ký sinh trùng ăn trộm thức ăn của các loài chim khác.\r\nVận động viên bơi lội kém, thường ở trên đất liền và di chuyển trước thủy triều dâng.', 'Được tìm thấy ở Châu Á, đặc biệt là ở Trung Quốc, Hồng Kông, Nhật Bản, Bắc Triều Tiên, Hàn Quốc, Ma Cao, Nga, Đài Loan và Việt Nam.', 'Giống như các châu lục đã đề cập ở trên.', 'Môi trường sống tự nhiên của chúng là vùng nước cửa sông và đầm lầy thủy triều.', 'Vulnerable', 'Tổng dân số ước tính khoảng 21.000 đến 22.000 cá thể và dường như đang suy giảm', 'Cực kỳ nguy cơ do săn bắn lịch sử và mất môi trường sống.'),
(11, 'Cú lợn rừng phương Đông có kích thước nhỏ đến trung bình, dài từ 9 đến 13 inch (tương đương 23 - 33 cm) và nặng từ 9 đến 11 ounce (khoảng 255 - 308 gram). Đầu rộng và tai có chút lông. Mặt của chúng có hình dáng góc cạnh với các đường vẽ hình chữ V màu đậm chạy dọc giữa mắt.', 'Cú lợn rừng phương Đông hoàn toàn hoạt động vào ban đêm. Chúng phân bố rộng rãi ở Đông Nam Á và một số khu vực ở Ấn Độ. Chúng thích sống trong rừng, vùng trồng cây và đầm lầy ngập mặn, thường ở độ cao lên đến 7.220 feet (khoảng 2.200 mét). Cú lợn rừng phương Đông được tìm thấy từ Nepal, Sikkim, Assam, Nagaland, Manipur, Myanmar và Thái Lan, về phía đông đến miền nam Trung Quốc và phía nam qua Bán đảo Mã Lai đến quần đảo Sundas lớn.', 'Phân bố ở Đông Nam Á và một số khu vực ở Ấn Độ.', 'Có mặt ở Ấn Độ, Thái Lan, Singapore, Philippines và các khu vực khác của Đông Nam Á.', 'Chúng sống trong rừng ẩm nhiệt đới và rừng xanh ẩm ở độ cao lên đến 1.040 - 1.050 mét so với mực nước biển.', 'Least Concern', 'Dữ liệu về số lượng còn lại không được rõ ràng, nhưng chúng không phổ biến và ít được biết đến.', 'Hiện tại, cú lợn rừng phương Đông vẫn được coi là loài ít bị quấy rối và không gặp nhiều nguy cơ tuyệt chủng.'),
(12, 'Cheo cheo Napu là một loài động vật có móng guốc. Mặc dù rất nhỏ so với các loài động vật có móng guốc khác, nhưng nó vẫn là một trong những thành viên lớn nhất của chi Tragulus. Nó nặng từ 5 đến 8 kg và có chiều dài cơ thể từ 70 đến 75 cm, đuôi dài từ 8 đến 10 cm. Chiều cao vai của nó khoảng 30 đến 35 cm. Nó có đầu hình tam giác với mũi nhỏ, nhọn, màu đen và mắt to. Đôi chân dài và mảnh mai như một cây bút chì. Lông trên phần trên của cơ thể nó có màu xám nâu hoặc cam nâu. Ở hai bên, lông khá nhạt, nhưng màu đậm dọc theo đường giữa. Dưới bụng, lông màu trắng, đặc biệt là ở cổ, bụng, ngực và cằm. Đực không có sừng hoặc gạc, nhưng có những “răng nanh” nhỏ - là những răng nanh kéo dài ở hàm trên.', 'Loài sống đơn độc và hoạt động vào ban đêm. Nó sử dụng các con đường nhỏ qua bụi cây trong rừng. Khi đực sẵn sàng giao phối, nó sẽ cọ một tuyến mùi lớn ở hàm dưới vào cái để xác định xem cái có sẵn sàng giao phối không. Nếu cái không sẵn sàng, nó sẽ đi xa. Đực rất thuộc vùng, đánh dấu lãnh thổ của mình bằng phân, nước tiểu và chất tiết từ tuyến mùi ở dưới cằm. Khi tức giận, đực đánh đất bằng móng vuốt với tốc độ bốn lần mỗi giây.', 'Châu Á', 'Indonesia, Malaysia, Brunei', 'Đô thị, rừng núi ẩm', 'Least Concern', 'Không chính xác, nhưng số lượng có thể giảm đáng kể do mất môi trường sống và săn bắn.', 'Loài này đang đối mặt với nguy cơ giảm số lượng và bị đe dọa.'),
(13, 'Là một loài chim có móng guốc. Nó nổi bật với màu xanh kim loại đặc trưng, chân và móng đen, và lông đuôi trắng độc đáo.', 'Sống trên các hòn đảo nhỏ và vùng ven biển từ Quần đảo Andaman và Nicobar, Ấn Độ, về phía đông qua Quần đảo Indonesia, đến Quần đảo Solomons và Palau.\r\nNó là loài chim đơn độc và hoạt động chủ yếu vào ban đêm. Nó sử dụng các con đường nhỏ qua bụi cây trong rừng. Khi đực sẵn sàng giao phối, nó sẽ cọ một tuyến mùi lớn ở hàm dưới vào cái để xác định xem cái có sẵn sàng giao phối không. Nếu cái không sẵn sàng, nó sẽ đi xa. Đực rất thuộc vùng, đánh dấu lãnh thổ của mình bằng phân, nước tiểu và chất tiết từ tuyến mùi ở dưới cằm. Khi tức giận, đực đánh đất bằng móng vuốt với tốc độ bốn lần mỗi giây.', 'có nguồn gốc từ Quần đảo Nicobar ở Ấn Độ Dương.', 'Quần đảo Nicobar, một phần của Ấn Độ, là nơi sinh sống của loài chim này.', 'Vương quốc Indo-Malayan', 'Near Threatened', 'Không xác định', 'Quần thể chim bồ câu Nicobar đang giảm do mất môi trường sống và bị săn bắn, đồng thời số lượng của chúng cũng đang giảm dần.'),
(14, 'Có kích thước lớn, có mỏ dài và chân màu xám. Chim đực có lông màu nâu hơi xám ở cánh và lưng, đầu đen và vạch vàng dưới cánh. Chim mái thường nhỏ hơn với lớp lông nâu.', 'Thường xuất hiện ở đồng cỏ và thảo nguyên, chúng sống đơn độc hoặc theo nhóm nhỏ. Chúng ưa ánh nắng và di chuyển trong khu vực mở.', 'Ấn Độ', 'Các bang Rajasthan, Maharashtra, Gujarat và Andhra Pradesh tại Ấn Độ.', 'Bán khô', 'Critically Endangered', '150 - 200 cá thể', 'Bị đe dọa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `results`
--

CREATE TABLE `results` (
  `IDResult` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `ImageLink` text NOT NULL,
  `PredictedAnimal` int(11) NOT NULL,
  `PredictedAccuracy` float NOT NULL,
  `Date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `results`
--

INSERT INTO `results` (`IDResult`, `IDUser`, `ImageLink`, `PredictedAnimal`, `PredictedAccuracy`, `Date`) VALUES
(17, 4, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/temp_1718462683.1589537.jpg?alt=media&token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFyZS1hbmltYWxzIiwiYXVkIjoicmFyZS1hbmltYWxzIiwiYXV0aF90aW1lIjoxNzE4NDYyNjkyLCJ1c2VyX2lkIjoicVowYjFHUGloYmRPYnk3SG9pbWRKbEtnQUExMyIsInN1YiI6InFaMGIxR1BpaGJkT2J5N0hvaW1kSmxLZ0FBMTMiLCJpYXQiOjE3MTg0NjI2OTIsImV4cCI6MTcxODQ2NjI5MiwiZW1haWwiOiJuZ3V5ZW5kdWN2YW4yNjA5MDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5ndXllbmR1Y3ZhbjI2MDkwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.NM82PpY-Q2fuvUc7XL757ce7ebsxzVNOiGh7X9IV3Io3NJlOo7sx1BtChRB_TJLg2snvuT0SLZThJTxFAG_5zGkc9UXJkNz3Q399HxlSJoqoy6z9SWBwwv_YOzH1haOl8S3zxBKa59D5nblkNHtcsvNZF5fZm_ubbM3hyI6jxp-hzzA6IWLbUN09PfiwOizEww8f3R4PSIwYgxrVY7eDtPe0-2tIluLidJR2qNfbQxqEvFRwc8kwevIaOx1uESvfJk3dhSkX19ktTMqDqncZo_f4CO5KXVs41jVaUhjAISEj5ySSDbimWpfIwnn3mC-6Voq8Q7vWcpIWry2Ura5RqA', 2, 85, '2024-06-15 21:44:58'),
(18, 4, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/temp_1718463746.9925382.jpg?alt=media&token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFyZS1hbmltYWxzIiwiYXVkIjoicmFyZS1hbmltYWxzIiwiYXV0aF90aW1lIjoxNzE4NDYzNzU2LCJ1c2VyX2lkIjoicVowYjFHUGloYmRPYnk3SG9pbWRKbEtnQUExMyIsInN1YiI6InFaMGIxR1BpaGJkT2J5N0hvaW1kSmxLZ0FBMTMiLCJpYXQiOjE3MTg0NjM3NTYsImV4cCI6MTcxODQ2NzM1NiwiZW1haWwiOiJuZ3V5ZW5kdWN2YW4yNjA5MDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5ndXllbmR1Y3ZhbjI2MDkwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.cpGubB-cdLjfHrxisGKxVQFiS2aEV38BPpS5ArVJ756SrxPP2fSm9huQ5k_yDo88A0xHNYWiPCaDcFf2g3EpbYm40tTijsbpHstV0_nqBFtP2nnd8Zi-AZJPYCixrBY0fWRpz8SNn7XA2wQhAFE84yTcMcM8amO0WsROlLphZlMuGgOB9lFJUSrZDLamj0k7lPZk2GabHjsb2dIt2fY3F0jn_GE04f0G1a3B4EU_NcvnSzmBJRZwlERbyEq3_QpcsvgKikCAHix__gwnsjoAJ0PTGQEQJGAXmSaIdHrz6-wLxRu7wjKYWeS90-dUeEMJm_K0dLgErKVmzOGpglPbGQ', 13, 71, '2024-06-15 22:02:45'),
(19, 4, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/temp_1718464511.4368064.jpg?alt=media&token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFyZS1hbmltYWxzIiwiYXVkIjoicmFyZS1hbmltYWxzIiwiYXV0aF90aW1lIjoxNzE4NDY0NTIxLCJ1c2VyX2lkIjoicVowYjFHUGloYmRPYnk3SG9pbWRKbEtnQUExMyIsInN1YiI6InFaMGIxR1BpaGJkT2J5N0hvaW1kSmxLZ0FBMTMiLCJpYXQiOjE3MTg0NjQ1MjEsImV4cCI6MTcxODQ2ODEyMSwiZW1haWwiOiJuZ3V5ZW5kdWN2YW4yNjA5MDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5ndXllbmR1Y3ZhbjI2MDkwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RifcymaANTrSBHMn_NVpO4kEdQToMlckipY8WQJAmX3ChCl7gJZ41Vp-kSrzSaYDnmEmVXFYQGJtBjkb7KsMx1OEzaV0ABvmVl-SELrJn-CbktlArAcnqxYZEIXgcN0N5Au3EB5Elkb7DhOX-AQnyF0x9zCgrlP49Ih2wPL5hpWNIAp8WmNZEmWE3rSm2U9yRAk2BtVnp1SVNDvAxf82yeHIpMhVybjL3PlMENtfvcZj30hkmZBYW6nB7eoQlpMZ_6P6UP3L5ID-K-umzfOd7LLOiix8oQIvBistHTmyQQO9X846ogBg5LMHXiVa11WqGg1-eHBkXbX5mQIuFvgwMg', 9, 75, '2024-06-15 22:15:28'),
(20, 4, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/temp_1718465467.8029065.jpg?alt=media&token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFyZS1hbmltYWxzIiwiYXVkIjoicmFyZS1hbmltYWxzIiwiYXV0aF90aW1lIjoxNzE4NDY1NDc3LCJ1c2VyX2lkIjoicVowYjFHUGloYmRPYnk3SG9pbWRKbEtnQUExMyIsInN1YiI6InFaMGIxR1BpaGJkT2J5N0hvaW1kSmxLZ0FBMTMiLCJpYXQiOjE3MTg0NjU0NzcsImV4cCI6MTcxODQ2OTA3NywiZW1haWwiOiJuZ3V5ZW5kdWN2YW4yNjA5MDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5ndXllbmR1Y3ZhbjI2MDkwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Sgq7_jKr9laYyP7ZIdS45zHDTmXB6JNV9fDjEaU5Rh-C__NAhr3x0388SpywOUeEAvsAWkKvvSLKl3yBHniA37J5u61e_zZEz2iuNV_U6N-qZaPhA3-mSDm7ZKltyhyphauJvBmet6B-lqmaX6HOpOrP6NtebrsXNDdJd9ZhjMn_qxucOdgUaDki-uYSJo5nh5-Sww1yY1TXJe6wO3tO2fCrJyTUs-LSO_N6pYwzpZT8Aq1a_E_acEoUwL5w-fn0aUj8BKITUlBdaLfYTtSpw2LYtuIZx3LsxoJe7thVWxPPEULMPi5pe5RwZwtxt1_S3B7aTU7lndb2zQY1Ylg42Q', 5, 73, '2024-06-15 22:31:24'),
(21, 4, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/temp_1718498339.843521.jpg?alt=media&token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFyZS1hbmltYWxzIiwiYXVkIjoicmFyZS1hbmltYWxzIiwiYXV0aF90aW1lIjoxNzE4NDk4MzUxLCJ1c2VyX2lkIjoicVowYjFHUGloYmRPYnk3SG9pbWRKbEtnQUExMyIsInN1YiI6InFaMGIxR1BpaGJkT2J5N0hvaW1kSmxLZ0FBMTMiLCJpYXQiOjE3MTg0OTgzNTEsImV4cCI6MTcxODUwMTk1MSwiZW1haWwiOiJuZ3V5ZW5kdWN2YW4yNjA5MDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5ndXllbmR1Y3ZhbjI2MDkwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.c457XTkqSOnb9-88qhuM17oC54ZPhsBpqZhsWP3yoBUISvtKDvnUxaKkArr9FNXVXGErokBQJvmnQreWLc6KSL2rknc6BA1XLuCnpAQsiG2BOuKW79c6fvQlhqbgRsRhdWVxuhI_RjE2iAU__gGC79GZuDaPwPfOcKZqQbDzDJL2a1f5e_mortw0Md2YkImCLBQTQYmRiiynyi5VZ36p4WtCoi-N1c7ZX6-Fmdmf2vWkaCCfuariEn6i8qoF9DIaoB7K7aY66sVO_zCiQM3Yg9kYj5YmQ1QppQaO7Q-oCy8cPdh_9qg029zpQFCjI8AIadkuoGhc2tky7fFXprjA3g', 9, 87, '2024-06-16 07:39:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `IDUser` int(11) NOT NULL,
  `Username` text NOT NULL,
  `Password` text NOT NULL,
  `Email` text NOT NULL,
  `DisplayName` text DEFAULT NULL,
  `Bio` text DEFAULT NULL,
  `Avatar` text DEFAULT NULL,
  `Role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`IDUser`, `Username`, `Password`, `Email`, `DisplayName`, `Bio`, `Avatar`, `Role`) VALUES
(1, 'admin1', 'admin1', 'hahywucenter1711@gmail.com', '', '', '', 0),
(2, 'kwinkwin0112', 'kwinkwin0112', 'nhuquynhtran688@gmail.com', 'Nhu Quynh Tran', '', '', 1),
(3, 'ducvan', 'ducvan', 'nguyenducvan@gmail.com', 'LuniuLun', 'Tất cả là của Vấn', 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/%E1%BA%A3nh%20th%E1%BA%BB.jpg?alt=media&token=ad2eec74-b4ec-49da-bf12-bf152ef71d46', 1),
(4, 'duclat', '$2a$10$iWUV0Dq69caH7mAH/SR1Z.5o7kV5nrSqrwIzD3cgQUrOjr5VS/d.2', 'nguyenduclat123@gmail.com', 'LuniuLun', 'Tất cả là của vấn', 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/7cf76d61-5c04-42cf-b127-334140aacd4b.jpg?alt=media&token=7cf76d61-5c04-42cf-b127-334140aacd4b.jpg', 1),
(6, 'admin', '$2a$10$e20x70DgX0zB9./olD2bA.L4NpyrL7c3FJM80JCCrC2Z4yhpPZ3v2', 'hahywu@gmail.com', 'Admin', NULL, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/b27af8ad-656b-4fdd-897e-a8dd501a7e60.jpg?alt=media&token=b27af8ad-656b-4fdd-897e-a8dd501a7e60.jpg', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_album`
--

CREATE TABLE `user_album` (
  `IDUserAlbum` int(11) NOT NULL,
  `IDUserAnimal` int(11) NOT NULL,
  `ImageLink` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_album`
--

INSERT INTO `user_album` (`IDUserAlbum`, `IDUserAnimal`, `ImageLink`) VALUES
(4, 3, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/95f03eaa-2100-4e14-9bfd-7a63a57d439c.jpg?alt=media&token=95f03eaa-2100-4e14-9bfd-7a63a57d439c.jpg'),
(5, 4, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/1997f34f-524b-4606-9942-0b76d0fc8e83.jpg?alt=media&token=1997f34f-524b-4606-9942-0b76d0fc8e83.jpg'),
(6, 5, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/4f9972fe-92a7-4790-a7b2-0bda867aee39.jpg?alt=media&token=4f9972fe-92a7-4790-a7b2-0bda867aee39.jpg'),
(7, 6, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/902abda2-826b-4ba6-a286-74b6d358a9d0.jpg?alt=media&token=902abda2-826b-4ba6-a286-74b6d358a9d0.jpg'),
(8, 7, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/9d5e5555-2df7-48bb-a541-9cb8c387314f.jpg?alt=media&token=9d5e5555-2df7-48bb-a541-9cb8c387314f.jpg'),
(9, 8, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/149fabd5-6294-4d02-a95d-b47cbb3de029.jpg?alt=media&token=149fabd5-6294-4d02-a95d-b47cbb3de029.jpg'),
(10, 9, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/6207b12d-af31-4d74-b088-288478f902b4.jpg?alt=media&token=6207b12d-af31-4d74-b088-288478f902b4.jpg'),
(11, 10, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/7b9ebc3a-2e1f-4f8d-ad75-a0728a83112e.jpg?alt=media&token=7b9ebc3a-2e1f-4f8d-ad75-a0728a83112e.jpg'),
(12, 10, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/fcda2f48-20cb-4dbd-a556-c29fcd2700b5.jpg?alt=media&token=fcda2f48-20cb-4dbd-a556-c29fcd2700b5.jpg'),
(13, 10, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/ddf592aa-13b0-4799-8cee-6be4e55b6245.jpg?alt=media&token=ddf592aa-13b0-4799-8cee-6be4e55b6245.jpg'),
(15, 12, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/d2d51192-bee1-42e1-a06d-136d65bec9d1.jpg?alt=media&token=d2d51192-bee1-42e1-a06d-136d65bec9d1.jpg'),
(24, 18, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/0479ead8-4694-4eb2-aa69-1725e07e08b6.jpg?alt=media&token=0479ead8-4694-4eb2-aa69-1725e07e08b6.jpg'),
(25, 19, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/85130bdf-cf12-426a-a4fc-693a638f7f20.jpg?alt=media&token=85130bdf-cf12-426a-a4fc-693a638f7f20.jpg'),
(26, 20, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/8b46ef44-2aab-458e-94a4-af0cd2e20ffd.jpg?alt=media&token=8b46ef44-2aab-458e-94a4-af0cd2e20ffd.jpg'),
(27, 21, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/33d676ea-b2ad-4dee-b38b-9b7a130444c6.jpg?alt=media&token=33d676ea-b2ad-4dee-b38b-9b7a130444c6.jpg'),
(28, 22, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/bf672bfe-d8ef-4168-a44b-32f833d6fbc6.jpg?alt=media&token=bf672bfe-d8ef-4168-a44b-32f833d6fbc6.jpg'),
(29, 23, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/bca4ab57-3231-4aa6-80c2-00e04bac89c7.jpg?alt=media&token=bca4ab57-3231-4aa6-80c2-00e04bac89c7.jpg'),
(30, 24, 'https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/4a118d22-64c9-456c-8256-3123eec15c1a.jpg?alt=media&token=4a118d22-64c9-456c-8256-3123eec15c1a.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_animal`
--

CREATE TABLE `user_animal` (
  `IDUserAnimal` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `IDAnimal` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Location` text NOT NULL,
  `Note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_animal`
--

INSERT INTO `user_animal` (`IDUserAnimal`, `IDUser`, `IDAnimal`, `Date`, `Location`, `Note`) VALUES
(3, 2, 2, '2024-04-10 07:00:00', 'VietNam', 'Con này ngon lắm'),
(4, 2, 7, '2024-04-12 07:00:00', 'USA', 'Con này không ăn được'),
(5, 2, 3, '2024-04-18 07:00:00', 'China', 'Con này có độc không ?'),
(6, 3, 5, '2024-04-11 07:00:00', 'Indonesia ', 'Con này cute ác'),
(7, 3, 1, '2024-04-12 07:00:00', 'Brazil', 'Con này không ăn thịt đâu'),
(8, 3, 4, '2024-01-16 07:00:00', 'Argentina ', ''),
(9, 3, 6, '2024-04-18 07:00:00', 'Amazon', ''),
(10, 3, 7, '2024-04-11 07:00:00', 'BinhDinh', 'éeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'),
(12, 4, 5, '2024-04-18 07:00:00', 'Thai Binh Duong', 'Con nay de bi ki sinh lam'),
(18, 4, 9, '2024-04-04 07:00:00', 'Australia ', 'Cute quai luon'),
(19, 4, 5, '2024-04-27 07:00:00', 'An do duong', 'Loai nay o day rat de tim thay'),
(20, 4, 9, '2024-02-02 07:00:00', 'England ', ''),
(21, 4, 7, '2023-10-20 07:00:00', 'Singapore ', 'Con nay mom to qua'),
(22, 4, 11, '2024-04-18 07:00:00', 'India', 'xo xo'),
(23, 4, 12, '2024-02-08 07:00:00', 'Tung cua', 'Nho nho xinh xinh '),
(24, 4, 13, '2023-02-01 07:00:00', 'Nicobar, Malaysia ', 'Chim nay nhin ze qua ');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`IDAnimal`),
  ADD KEY `IDDetail` (`IDDetail`);

--
-- Chỉ mục cho bảng `animal_album`
--
ALTER TABLE `animal_album`
  ADD PRIMARY KEY (`IDAnimalAlbum`),
  ADD KEY `IDAnimal` (`IDAnimal`);

--
-- Chỉ mục cho bảng `detail_animal`
--
ALTER TABLE `detail_animal`
  ADD PRIMARY KEY (`IDDetail`);

--
-- Chỉ mục cho bảng `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`IDResult`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `PredictedAnimal` (`PredictedAnimal`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`IDUser`);

--
-- Chỉ mục cho bảng `user_album`
--
ALTER TABLE `user_album`
  ADD PRIMARY KEY (`IDUserAlbum`),
  ADD KEY `IDUserAnimal` (`IDUserAnimal`);

--
-- Chỉ mục cho bảng `user_animal`
--
ALTER TABLE `user_animal`
  ADD PRIMARY KEY (`IDUserAnimal`),
  ADD KEY `IDUser` (`IDUser`,`IDAnimal`),
  ADD KEY `IDAnimal` (`IDAnimal`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `animals`
--
ALTER TABLE `animals`
  MODIFY `IDAnimal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `animal_album`
--
ALTER TABLE `animal_album`
  MODIFY `IDAnimalAlbum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT cho bảng `detail_animal`
--
ALTER TABLE `detail_animal`
  MODIFY `IDDetail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `results`
--
ALTER TABLE `results`
  MODIFY `IDResult` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `user_album`
--
ALTER TABLE `user_album`
  MODIFY `IDUserAlbum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `user_animal`
--
ALTER TABLE `user_animal`
  MODIFY `IDUserAnimal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `animals`
--
ALTER TABLE `animals`
  ADD CONSTRAINT `animals_ibfk_1` FOREIGN KEY (`IDDetail`) REFERENCES `detail_animal` (`IDDetail`);

--
-- Các ràng buộc cho bảng `animal_album`
--
ALTER TABLE `animal_album`
  ADD CONSTRAINT `animal_album_ibfk_1` FOREIGN KEY (`IDAnimal`) REFERENCES `animals` (`IDAnimal`);

--
-- Các ràng buộc cho bảng `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`IDUser`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`PredictedAnimal`) REFERENCES `animals` (`IDAnimal`);

--
-- Các ràng buộc cho bảng `user_album`
--
ALTER TABLE `user_album`
  ADD CONSTRAINT `user_album_ibfk_1` FOREIGN KEY (`IDUserAnimal`) REFERENCES `user_animal` (`IDUserAnimal`);

--
-- Các ràng buộc cho bảng `user_animal`
--
ALTER TABLE `user_animal`
  ADD CONSTRAINT `user_animal_ibfk_1` FOREIGN KEY (`IDAnimal`) REFERENCES `animals` (`IDAnimal`),
  ADD CONSTRAINT `user_animal_ibfk_2` FOREIGN KEY (`IDUser`) REFERENCES `user` (`IDUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
