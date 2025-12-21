-- Bangladesh Address Database
-- Generated: 2025-12-21T19:10:11.947Z
-- Source: https://github.com/rajuAhmed1705/bangladesh-address

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table: divisions
-- ----------------------------
DROP TABLE IF EXISTS thanas;
DROP TABLE IF EXISTS upazilas;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS divisions;

CREATE TABLE divisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table: districts
-- ----------------------------
CREATE TABLE districts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  division_id INTEGER NOT NULL,
  name TEXT NOT NULL UNIQUE,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
);

CREATE INDEX idx_districts_division ON districts(division_id);

-- ----------------------------
-- Table: upazilas
-- ----------------------------
CREATE TABLE upazilas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  district_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

CREATE INDEX idx_upazilas_district ON upazilas(district_id);
CREATE INDEX idx_upazilas_name ON upazilas(name);

-- ----------------------------
-- Table: thanas
-- ----------------------------
CREATE TABLE thanas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  district_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

CREATE INDEX idx_thanas_district ON thanas(district_id);
CREATE INDEX idx_thanas_name ON thanas(name);

PRAGMA foreign_keys = ON;

-- ----------------------------
-- Data: divisions
-- ----------------------------
INSERT INTO divisions (id, name) VALUES (1, 'Barisal');
INSERT INTO divisions (id, name) VALUES (2, 'Chattogram');
INSERT INTO divisions (id, name) VALUES (3, 'Dhaka');
INSERT INTO divisions (id, name) VALUES (4, 'Khulna');
INSERT INTO divisions (id, name) VALUES (5, 'Mymensingh');
INSERT INTO divisions (id, name) VALUES (6, 'Rajshahi');
INSERT INTO divisions (id, name) VALUES (7, 'Rangpur');
INSERT INTO divisions (id, name) VALUES (8, 'Sylhet');

-- ----------------------------
-- Data: districts
-- ----------------------------
INSERT INTO districts (id, division_id, name) VALUES (1, 4, 'Bagerhat');
INSERT INTO districts (id, division_id, name) VALUES (2, 2, 'Bandarban');
INSERT INTO districts (id, division_id, name) VALUES (3, 1, 'Barguna');
INSERT INTO districts (id, division_id, name) VALUES (4, 1, 'Barisal');
INSERT INTO districts (id, division_id, name) VALUES (5, 1, 'Bhola');
INSERT INTO districts (id, division_id, name) VALUES (6, 6, 'Bogra');
INSERT INTO districts (id, division_id, name) VALUES (7, 2, 'Brahmanbaria');
INSERT INTO districts (id, division_id, name) VALUES (8, 2, 'Chandpur');
INSERT INTO districts (id, division_id, name) VALUES (9, 6, 'Chapainawabganj');
INSERT INTO districts (id, division_id, name) VALUES (10, 2, 'Chattogram');
INSERT INTO districts (id, division_id, name) VALUES (11, 4, 'Chuadanga');
INSERT INTO districts (id, division_id, name) VALUES (12, 2, 'Comilla');
INSERT INTO districts (id, division_id, name) VALUES (13, 2, 'Cox''s Bazar');
INSERT INTO districts (id, division_id, name) VALUES (14, 3, 'Dhaka');
INSERT INTO districts (id, division_id, name) VALUES (15, 7, 'Dinajpur');
INSERT INTO districts (id, division_id, name) VALUES (16, 3, 'Faridpur');
INSERT INTO districts (id, division_id, name) VALUES (17, 2, 'Feni');
INSERT INTO districts (id, division_id, name) VALUES (18, 7, 'Gaibandha');
INSERT INTO districts (id, division_id, name) VALUES (19, 3, 'Gazipur');
INSERT INTO districts (id, division_id, name) VALUES (20, 3, 'Gopalganj');
INSERT INTO districts (id, division_id, name) VALUES (21, 8, 'Habiganj');
INSERT INTO districts (id, division_id, name) VALUES (22, 5, 'Jamalpur');
INSERT INTO districts (id, division_id, name) VALUES (23, 4, 'Jessore');
INSERT INTO districts (id, division_id, name) VALUES (24, 1, 'Jhalokati');
INSERT INTO districts (id, division_id, name) VALUES (25, 4, 'Jhenaidah');
INSERT INTO districts (id, division_id, name) VALUES (26, 6, 'Joypurhat');
INSERT INTO districts (id, division_id, name) VALUES (27, 2, 'Khagrachari');
INSERT INTO districts (id, division_id, name) VALUES (28, 4, 'Khulna');
INSERT INTO districts (id, division_id, name) VALUES (29, 3, 'Kishoreganj');
INSERT INTO districts (id, division_id, name) VALUES (30, 7, 'Kurigram');
INSERT INTO districts (id, division_id, name) VALUES (31, 4, 'Kushtia');
INSERT INTO districts (id, division_id, name) VALUES (32, 2, 'Lakshmipur');
INSERT INTO districts (id, division_id, name) VALUES (33, 7, 'Lalmonirhat');
INSERT INTO districts (id, division_id, name) VALUES (34, 3, 'Madaripur');
INSERT INTO districts (id, division_id, name) VALUES (35, 4, 'Magura');
INSERT INTO districts (id, division_id, name) VALUES (36, 3, 'Manikganj');
INSERT INTO districts (id, division_id, name) VALUES (37, 4, 'Meherpur');
INSERT INTO districts (id, division_id, name) VALUES (38, 8, 'Moulvibazar');
INSERT INTO districts (id, division_id, name) VALUES (39, 3, 'Munshiganj');
INSERT INTO districts (id, division_id, name) VALUES (40, 5, 'Mymensingh');
INSERT INTO districts (id, division_id, name) VALUES (41, 6, 'Naogaon');
INSERT INTO districts (id, division_id, name) VALUES (42, 4, 'Narail');
INSERT INTO districts (id, division_id, name) VALUES (43, 3, 'Narayanganj');
INSERT INTO districts (id, division_id, name) VALUES (44, 3, 'Narsingdi');
INSERT INTO districts (id, division_id, name) VALUES (45, 6, 'Natore');
INSERT INTO districts (id, division_id, name) VALUES (46, 5, 'Netrokona');
INSERT INTO districts (id, division_id, name) VALUES (47, 7, 'Nilphamari');
INSERT INTO districts (id, division_id, name) VALUES (48, 2, 'Noakhali');
INSERT INTO districts (id, division_id, name) VALUES (49, 6, 'Pabna');
INSERT INTO districts (id, division_id, name) VALUES (50, 7, 'Panchagarh');
INSERT INTO districts (id, division_id, name) VALUES (51, 1, 'Patuakhali');
INSERT INTO districts (id, division_id, name) VALUES (52, 1, 'Pirojpur');
INSERT INTO districts (id, division_id, name) VALUES (53, 3, 'Rajbari');
INSERT INTO districts (id, division_id, name) VALUES (54, 6, 'Rajshahi');
INSERT INTO districts (id, division_id, name) VALUES (55, 2, 'Rangamati');
INSERT INTO districts (id, division_id, name) VALUES (56, 7, 'Rangpur');
INSERT INTO districts (id, division_id, name) VALUES (57, 4, 'Satkhira');
INSERT INTO districts (id, division_id, name) VALUES (58, 3, 'Shariatpur');
INSERT INTO districts (id, division_id, name) VALUES (59, 5, 'Sherpur');
INSERT INTO districts (id, division_id, name) VALUES (60, 6, 'Sirajganj');
INSERT INTO districts (id, division_id, name) VALUES (61, 8, 'Sunamganj');
INSERT INTO districts (id, division_id, name) VALUES (62, 8, 'Sylhet');
INSERT INTO districts (id, division_id, name) VALUES (63, 3, 'Tangail');
INSERT INTO districts (id, division_id, name) VALUES (64, 7, 'Thakurgaon');

-- ----------------------------
-- Data: upazilas
-- ----------------------------
INSERT INTO upazilas (id, district_id, name) VALUES (1, 3, 'Amtali');
INSERT INTO upazilas (id, district_id, name) VALUES (2, 3, 'Bamna');
INSERT INTO upazilas (id, district_id, name) VALUES (3, 3, 'Barguna Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (4, 3, 'Betagi');
INSERT INTO upazilas (id, district_id, name) VALUES (5, 3, 'Patharghata');
INSERT INTO upazilas (id, district_id, name) VALUES (6, 3, 'Taltali');
INSERT INTO upazilas (id, district_id, name) VALUES (7, 4, 'Muladi');
INSERT INTO upazilas (id, district_id, name) VALUES (8, 4, 'Babuganj');
INSERT INTO upazilas (id, district_id, name) VALUES (9, 4, 'Agailjhara');
INSERT INTO upazilas (id, district_id, name) VALUES (10, 4, 'Barisal Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (11, 4, 'Bakerganj');
INSERT INTO upazilas (id, district_id, name) VALUES (12, 4, 'Banaripara');
INSERT INTO upazilas (id, district_id, name) VALUES (13, 4, 'Gaurnadi');
INSERT INTO upazilas (id, district_id, name) VALUES (14, 4, 'Hizla');
INSERT INTO upazilas (id, district_id, name) VALUES (15, 4, 'Mehendiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (16, 4, 'Wazirpur');
INSERT INTO upazilas (id, district_id, name) VALUES (17, 5, 'Bhola Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (18, 5, 'Burhanuddin');
INSERT INTO upazilas (id, district_id, name) VALUES (19, 5, 'Char Fasson');
INSERT INTO upazilas (id, district_id, name) VALUES (20, 5, 'Daulatkhan');
INSERT INTO upazilas (id, district_id, name) VALUES (21, 5, 'Lalmohan');
INSERT INTO upazilas (id, district_id, name) VALUES (22, 5, 'Manpura');
INSERT INTO upazilas (id, district_id, name) VALUES (23, 5, 'Tazumuddin');
INSERT INTO upazilas (id, district_id, name) VALUES (24, 24, 'Jhalokati Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (25, 24, 'Kathalia');
INSERT INTO upazilas (id, district_id, name) VALUES (26, 24, 'Nalchity');
INSERT INTO upazilas (id, district_id, name) VALUES (27, 24, 'Rajapur');
INSERT INTO upazilas (id, district_id, name) VALUES (28, 51, 'Bauphal');
INSERT INTO upazilas (id, district_id, name) VALUES (29, 51, 'Dashmina');
INSERT INTO upazilas (id, district_id, name) VALUES (30, 51, 'Galachipa');
INSERT INTO upazilas (id, district_id, name) VALUES (31, 51, 'Kalapara');
INSERT INTO upazilas (id, district_id, name) VALUES (32, 51, 'Mirzaganj');
INSERT INTO upazilas (id, district_id, name) VALUES (33, 51, 'Patuakhali Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (34, 51, 'Dumki');
INSERT INTO upazilas (id, district_id, name) VALUES (35, 51, 'Rangabali');
INSERT INTO upazilas (id, district_id, name) VALUES (36, 52, 'Bhandaria');
INSERT INTO upazilas (id, district_id, name) VALUES (37, 52, 'Kaukhali');
INSERT INTO upazilas (id, district_id, name) VALUES (38, 52, 'Mathbaria');
INSERT INTO upazilas (id, district_id, name) VALUES (39, 52, 'Nazirpur');
INSERT INTO upazilas (id, district_id, name) VALUES (40, 52, 'Nesarabad');
INSERT INTO upazilas (id, district_id, name) VALUES (41, 52, 'Pirojpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (42, 52, 'Zianagar');
INSERT INTO upazilas (id, district_id, name) VALUES (43, 2, 'Bandarban Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (44, 2, 'Thanchi');
INSERT INTO upazilas (id, district_id, name) VALUES (45, 2, 'Lama');
INSERT INTO upazilas (id, district_id, name) VALUES (46, 2, 'Naikhongchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (47, 2, 'Ali kadam');
INSERT INTO upazilas (id, district_id, name) VALUES (48, 2, 'Rowangchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (49, 2, 'Ruma');
INSERT INTO upazilas (id, district_id, name) VALUES (50, 7, 'Brahmanbaria Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (51, 7, 'Ashuganj');
INSERT INTO upazilas (id, district_id, name) VALUES (52, 7, 'Nasirnagar');
INSERT INTO upazilas (id, district_id, name) VALUES (53, 7, 'Nabinagar');
INSERT INTO upazilas (id, district_id, name) VALUES (54, 7, 'Sarail');
INSERT INTO upazilas (id, district_id, name) VALUES (55, 7, 'Shahbazpur Town');
INSERT INTO upazilas (id, district_id, name) VALUES (56, 7, 'Kasba');
INSERT INTO upazilas (id, district_id, name) VALUES (57, 7, 'Akhaura');
INSERT INTO upazilas (id, district_id, name) VALUES (58, 7, 'Bancharampur');
INSERT INTO upazilas (id, district_id, name) VALUES (59, 7, 'Bijoynagar');
INSERT INTO upazilas (id, district_id, name) VALUES (60, 8, 'Chandpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (61, 8, 'Faridganj');
INSERT INTO upazilas (id, district_id, name) VALUES (62, 8, 'Haimchar');
INSERT INTO upazilas (id, district_id, name) VALUES (63, 8, 'Haziganj');
INSERT INTO upazilas (id, district_id, name) VALUES (64, 8, 'Kachua');
INSERT INTO upazilas (id, district_id, name) VALUES (65, 8, 'Matlab Uttar');
INSERT INTO upazilas (id, district_id, name) VALUES (66, 8, 'Matlab Dakkhin');
INSERT INTO upazilas (id, district_id, name) VALUES (67, 8, 'Shahrasti');
INSERT INTO upazilas (id, district_id, name) VALUES (68, 10, 'Anwara');
INSERT INTO upazilas (id, district_id, name) VALUES (69, 10, 'Banshkhali');
INSERT INTO upazilas (id, district_id, name) VALUES (70, 10, 'Boalkhali');
INSERT INTO upazilas (id, district_id, name) VALUES (71, 10, 'Chandanaish');
INSERT INTO upazilas (id, district_id, name) VALUES (72, 10, 'Fatikchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (73, 10, 'Hathazari');
INSERT INTO upazilas (id, district_id, name) VALUES (74, 10, 'Lohagara');
INSERT INTO upazilas (id, district_id, name) VALUES (75, 10, 'Mirsharai');
INSERT INTO upazilas (id, district_id, name) VALUES (76, 10, 'Patiya');
INSERT INTO upazilas (id, district_id, name) VALUES (77, 10, 'Rangunia');
INSERT INTO upazilas (id, district_id, name) VALUES (78, 10, 'Raozan');
INSERT INTO upazilas (id, district_id, name) VALUES (79, 10, 'Sandwip');
INSERT INTO upazilas (id, district_id, name) VALUES (80, 10, 'Satkania');
INSERT INTO upazilas (id, district_id, name) VALUES (81, 10, 'Sitakunda');
INSERT INTO upazilas (id, district_id, name) VALUES (82, 12, 'Barura');
INSERT INTO upazilas (id, district_id, name) VALUES (83, 12, 'Brahmanpara');
INSERT INTO upazilas (id, district_id, name) VALUES (84, 12, 'Burichong');
INSERT INTO upazilas (id, district_id, name) VALUES (85, 12, 'Chandina');
INSERT INTO upazilas (id, district_id, name) VALUES (86, 12, 'Chauddagram');
INSERT INTO upazilas (id, district_id, name) VALUES (87, 12, 'Daudkandi');
INSERT INTO upazilas (id, district_id, name) VALUES (88, 12, 'Debidwar');
INSERT INTO upazilas (id, district_id, name) VALUES (89, 12, 'Homna');
INSERT INTO upazilas (id, district_id, name) VALUES (90, 12, 'Comilla Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (91, 12, 'Laksam');
INSERT INTO upazilas (id, district_id, name) VALUES (92, 12, 'Monohorgonj');
INSERT INTO upazilas (id, district_id, name) VALUES (93, 12, 'Meghna');
INSERT INTO upazilas (id, district_id, name) VALUES (94, 12, 'Muradnagar');
INSERT INTO upazilas (id, district_id, name) VALUES (95, 12, 'Nangalkot');
INSERT INTO upazilas (id, district_id, name) VALUES (96, 12, 'Comilla Sadar South');
INSERT INTO upazilas (id, district_id, name) VALUES (97, 12, 'Titas');
INSERT INTO upazilas (id, district_id, name) VALUES (98, 13, 'Chakaria');
INSERT INTO upazilas (id, district_id, name) VALUES (99, 13, 'Cox''s Bazar Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (100, 13, 'Kutubdia');
INSERT INTO upazilas (id, district_id, name) VALUES (101, 13, 'Maheshkhali');
INSERT INTO upazilas (id, district_id, name) VALUES (102, 13, 'Ramu');
INSERT INTO upazilas (id, district_id, name) VALUES (103, 13, 'Teknaf');
INSERT INTO upazilas (id, district_id, name) VALUES (104, 13, 'Ukhia');
INSERT INTO upazilas (id, district_id, name) VALUES (105, 13, 'Pekua');
INSERT INTO upazilas (id, district_id, name) VALUES (106, 17, 'Feni Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (107, 17, 'Chagalnaiya');
INSERT INTO upazilas (id, district_id, name) VALUES (108, 17, 'Daganbhyan');
INSERT INTO upazilas (id, district_id, name) VALUES (109, 17, 'Parshuram');
INSERT INTO upazilas (id, district_id, name) VALUES (110, 17, 'Fhulgazi');
INSERT INTO upazilas (id, district_id, name) VALUES (111, 17, 'Sonagazi');
INSERT INTO upazilas (id, district_id, name) VALUES (112, 27, 'Dighinala');
INSERT INTO upazilas (id, district_id, name) VALUES (113, 27, 'Khagrachhari');
INSERT INTO upazilas (id, district_id, name) VALUES (114, 27, 'Lakshmichhari');
INSERT INTO upazilas (id, district_id, name) VALUES (115, 27, 'Mahalchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (116, 27, 'Manikchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (117, 27, 'Matiranga');
INSERT INTO upazilas (id, district_id, name) VALUES (118, 27, 'Panchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (119, 27, 'Ramgarh');
INSERT INTO upazilas (id, district_id, name) VALUES (120, 32, 'Lakshmipur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (121, 32, 'Raipur');
INSERT INTO upazilas (id, district_id, name) VALUES (122, 32, 'Ramganj');
INSERT INTO upazilas (id, district_id, name) VALUES (123, 32, 'Ramgati');
INSERT INTO upazilas (id, district_id, name) VALUES (124, 32, 'Komol Nagar');
INSERT INTO upazilas (id, district_id, name) VALUES (125, 48, 'Noakhali Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (126, 48, 'Begumganj');
INSERT INTO upazilas (id, district_id, name) VALUES (127, 48, 'Chatkhil');
INSERT INTO upazilas (id, district_id, name) VALUES (128, 48, 'Companyganj');
INSERT INTO upazilas (id, district_id, name) VALUES (129, 48, 'Shenbag');
INSERT INTO upazilas (id, district_id, name) VALUES (130, 48, 'Hatia');
INSERT INTO upazilas (id, district_id, name) VALUES (131, 48, 'Kobirhat');
INSERT INTO upazilas (id, district_id, name) VALUES (132, 48, 'Sonaimuri');
INSERT INTO upazilas (id, district_id, name) VALUES (133, 48, 'Suborno Char');
INSERT INTO upazilas (id, district_id, name) VALUES (134, 55, 'Rangamati Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (135, 55, 'Belaichhari');
INSERT INTO upazilas (id, district_id, name) VALUES (136, 55, 'Bagaichhari');
INSERT INTO upazilas (id, district_id, name) VALUES (137, 55, 'Barkal');
INSERT INTO upazilas (id, district_id, name) VALUES (138, 55, 'Juraichhari');
INSERT INTO upazilas (id, district_id, name) VALUES (139, 55, 'Rajasthali');
INSERT INTO upazilas (id, district_id, name) VALUES (140, 55, 'Kaptai');
INSERT INTO upazilas (id, district_id, name) VALUES (141, 55, 'Langadu');
INSERT INTO upazilas (id, district_id, name) VALUES (142, 55, 'Nannerchar');
INSERT INTO upazilas (id, district_id, name) VALUES (143, 55, 'Kaukhali');
INSERT INTO upazilas (id, district_id, name) VALUES (144, 14, 'Dhamrai');
INSERT INTO upazilas (id, district_id, name) VALUES (145, 14, 'Dohar');
INSERT INTO upazilas (id, district_id, name) VALUES (146, 14, 'Keraniganj');
INSERT INTO upazilas (id, district_id, name) VALUES (147, 14, 'Nawabganj');
INSERT INTO upazilas (id, district_id, name) VALUES (148, 14, 'Savar');
INSERT INTO upazilas (id, district_id, name) VALUES (149, 16, 'Faridpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (150, 16, 'Boalmari');
INSERT INTO upazilas (id, district_id, name) VALUES (151, 16, 'Alfadanga');
INSERT INTO upazilas (id, district_id, name) VALUES (152, 16, 'Madhukhali');
INSERT INTO upazilas (id, district_id, name) VALUES (153, 16, 'Bhanga');
INSERT INTO upazilas (id, district_id, name) VALUES (154, 16, 'Nagarkanda');
INSERT INTO upazilas (id, district_id, name) VALUES (155, 16, 'Charbhadrasan');
INSERT INTO upazilas (id, district_id, name) VALUES (156, 16, 'Sadarpur');
INSERT INTO upazilas (id, district_id, name) VALUES (157, 16, 'Shaltha');
INSERT INTO upazilas (id, district_id, name) VALUES (158, 19, 'Gazipur Sadar-Joydebpur');
INSERT INTO upazilas (id, district_id, name) VALUES (159, 19, 'Kaliakior');
INSERT INTO upazilas (id, district_id, name) VALUES (160, 19, 'Kapasia');
INSERT INTO upazilas (id, district_id, name) VALUES (161, 19, 'Sripur');
INSERT INTO upazilas (id, district_id, name) VALUES (162, 19, 'Kaliganj');
INSERT INTO upazilas (id, district_id, name) VALUES (163, 19, 'Tongi');
INSERT INTO upazilas (id, district_id, name) VALUES (164, 20, 'Gopalganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (165, 20, 'Kashiani');
INSERT INTO upazilas (id, district_id, name) VALUES (166, 20, 'Kotalipara');
INSERT INTO upazilas (id, district_id, name) VALUES (167, 20, 'Muksudpur');
INSERT INTO upazilas (id, district_id, name) VALUES (168, 20, 'Tungipara');
INSERT INTO upazilas (id, district_id, name) VALUES (169, 22, 'Dewanganj');
INSERT INTO upazilas (id, district_id, name) VALUES (170, 22, 'Baksiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (171, 22, 'Islampur');
INSERT INTO upazilas (id, district_id, name) VALUES (172, 22, 'Jamalpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (173, 22, 'Madarganj');
INSERT INTO upazilas (id, district_id, name) VALUES (174, 22, 'Melandaha');
INSERT INTO upazilas (id, district_id, name) VALUES (175, 22, 'Sarishabari');
INSERT INTO upazilas (id, district_id, name) VALUES (176, 22, 'Narundi Police I.C');
INSERT INTO upazilas (id, district_id, name) VALUES (177, 29, 'Astagram');
INSERT INTO upazilas (id, district_id, name) VALUES (178, 29, 'Bajitpur');
INSERT INTO upazilas (id, district_id, name) VALUES (179, 29, 'Bhairab');
INSERT INTO upazilas (id, district_id, name) VALUES (180, 29, 'Hossainpur');
INSERT INTO upazilas (id, district_id, name) VALUES (181, 29, 'Itna');
INSERT INTO upazilas (id, district_id, name) VALUES (182, 29, 'Karimganj');
INSERT INTO upazilas (id, district_id, name) VALUES (183, 29, 'Katiadi');
INSERT INTO upazilas (id, district_id, name) VALUES (184, 29, 'Kishoreganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (185, 29, 'Kuliarchar');
INSERT INTO upazilas (id, district_id, name) VALUES (186, 29, 'Mithamain');
INSERT INTO upazilas (id, district_id, name) VALUES (187, 29, 'Nikli');
INSERT INTO upazilas (id, district_id, name) VALUES (188, 29, 'Pakundia');
INSERT INTO upazilas (id, district_id, name) VALUES (189, 29, 'Tarail');
INSERT INTO upazilas (id, district_id, name) VALUES (190, 34, 'Madaripur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (191, 34, 'Kalkini');
INSERT INTO upazilas (id, district_id, name) VALUES (192, 34, 'Rajoir');
INSERT INTO upazilas (id, district_id, name) VALUES (193, 34, 'Shibchar');
INSERT INTO upazilas (id, district_id, name) VALUES (194, 34, 'Dasar');
INSERT INTO upazilas (id, district_id, name) VALUES (195, 36, 'Manikganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (196, 36, 'Singair');
INSERT INTO upazilas (id, district_id, name) VALUES (197, 36, 'Shibalaya');
INSERT INTO upazilas (id, district_id, name) VALUES (198, 36, 'Saturia');
INSERT INTO upazilas (id, district_id, name) VALUES (199, 36, 'Harirampur');
INSERT INTO upazilas (id, district_id, name) VALUES (200, 36, 'Ghior');
INSERT INTO upazilas (id, district_id, name) VALUES (201, 36, 'Daulatpur');
INSERT INTO upazilas (id, district_id, name) VALUES (202, 39, 'Lohajang');
INSERT INTO upazilas (id, district_id, name) VALUES (203, 39, 'Sreenagar');
INSERT INTO upazilas (id, district_id, name) VALUES (204, 39, 'Munshiganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (205, 39, 'Sirajdikhan');
INSERT INTO upazilas (id, district_id, name) VALUES (206, 39, 'Tongibari');
INSERT INTO upazilas (id, district_id, name) VALUES (207, 39, 'Gazaria');
INSERT INTO upazilas (id, district_id, name) VALUES (208, 40, 'Bhaluka');
INSERT INTO upazilas (id, district_id, name) VALUES (209, 40, 'Trishal');
INSERT INTO upazilas (id, district_id, name) VALUES (210, 40, 'Haluaghat');
INSERT INTO upazilas (id, district_id, name) VALUES (211, 40, 'Muktagachha');
INSERT INTO upazilas (id, district_id, name) VALUES (212, 40, 'Dhobaura');
INSERT INTO upazilas (id, district_id, name) VALUES (213, 40, 'Fulbaria');
INSERT INTO upazilas (id, district_id, name) VALUES (214, 40, 'Gaffargaon');
INSERT INTO upazilas (id, district_id, name) VALUES (215, 40, 'Gauripur');
INSERT INTO upazilas (id, district_id, name) VALUES (216, 40, 'Ishwarganj');
INSERT INTO upazilas (id, district_id, name) VALUES (217, 40, 'Mymensingh Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (218, 40, 'Nandail');
INSERT INTO upazilas (id, district_id, name) VALUES (219, 40, 'Phulpur');
INSERT INTO upazilas (id, district_id, name) VALUES (220, 40, 'Tarakanda');
INSERT INTO upazilas (id, district_id, name) VALUES (221, 43, 'Araihazar');
INSERT INTO upazilas (id, district_id, name) VALUES (222, 43, 'Sonargaon');
INSERT INTO upazilas (id, district_id, name) VALUES (223, 43, 'Bandar');
INSERT INTO upazilas (id, district_id, name) VALUES (224, 43, 'Naryanganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (225, 43, 'Rupganj');
INSERT INTO upazilas (id, district_id, name) VALUES (226, 43, 'Siddirgonj');
INSERT INTO upazilas (id, district_id, name) VALUES (227, 44, 'Belabo');
INSERT INTO upazilas (id, district_id, name) VALUES (228, 44, 'Monohardi');
INSERT INTO upazilas (id, district_id, name) VALUES (229, 44, 'Narsingdi Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (230, 44, 'Palash');
INSERT INTO upazilas (id, district_id, name) VALUES (231, 44, 'Raipura');
INSERT INTO upazilas (id, district_id, name) VALUES (232, 44, 'Shibpur');
INSERT INTO upazilas (id, district_id, name) VALUES (233, 46, 'Kendua');
INSERT INTO upazilas (id, district_id, name) VALUES (234, 46, 'Atpara');
INSERT INTO upazilas (id, district_id, name) VALUES (235, 46, 'Barhatta');
INSERT INTO upazilas (id, district_id, name) VALUES (236, 46, 'Durgapur');
INSERT INTO upazilas (id, district_id, name) VALUES (237, 46, 'Kalmakanda');
INSERT INTO upazilas (id, district_id, name) VALUES (238, 46, 'Madan');
INSERT INTO upazilas (id, district_id, name) VALUES (239, 46, 'Mohanganj');
INSERT INTO upazilas (id, district_id, name) VALUES (240, 46, 'Netrokona Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (241, 46, 'Purbadhala');
INSERT INTO upazilas (id, district_id, name) VALUES (242, 46, 'Khaliajuri');
INSERT INTO upazilas (id, district_id, name) VALUES (243, 53, 'Baliakandi');
INSERT INTO upazilas (id, district_id, name) VALUES (244, 53, 'Goalandaghat');
INSERT INTO upazilas (id, district_id, name) VALUES (245, 53, 'Pangsha');
INSERT INTO upazilas (id, district_id, name) VALUES (246, 53, 'Kalukhali');
INSERT INTO upazilas (id, district_id, name) VALUES (247, 53, 'Rajbari Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (248, 58, 'Shariatpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (249, 58, 'Damudya');
INSERT INTO upazilas (id, district_id, name) VALUES (250, 58, 'Naria');
INSERT INTO upazilas (id, district_id, name) VALUES (251, 58, 'Jajira');
INSERT INTO upazilas (id, district_id, name) VALUES (252, 58, 'Bhedarganj');
INSERT INTO upazilas (id, district_id, name) VALUES (253, 58, 'Gosairhat');
INSERT INTO upazilas (id, district_id, name) VALUES (254, 59, 'Jhenaigati');
INSERT INTO upazilas (id, district_id, name) VALUES (255, 59, 'Nakla');
INSERT INTO upazilas (id, district_id, name) VALUES (256, 59, 'Nalitabari');
INSERT INTO upazilas (id, district_id, name) VALUES (257, 59, 'Sherpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (258, 59, 'Sreebardi');
INSERT INTO upazilas (id, district_id, name) VALUES (259, 63, 'Tangail Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (260, 63, 'Sakhipur');
INSERT INTO upazilas (id, district_id, name) VALUES (261, 63, 'Basail');
INSERT INTO upazilas (id, district_id, name) VALUES (262, 63, 'Madhupur');
INSERT INTO upazilas (id, district_id, name) VALUES (263, 63, 'Ghatail');
INSERT INTO upazilas (id, district_id, name) VALUES (264, 63, 'Kalihati');
INSERT INTO upazilas (id, district_id, name) VALUES (265, 63, 'Nagarpur');
INSERT INTO upazilas (id, district_id, name) VALUES (266, 63, 'Mirzapur');
INSERT INTO upazilas (id, district_id, name) VALUES (267, 63, 'Gopalpur');
INSERT INTO upazilas (id, district_id, name) VALUES (268, 63, 'Delduar');
INSERT INTO upazilas (id, district_id, name) VALUES (269, 63, 'Bhuapur');
INSERT INTO upazilas (id, district_id, name) VALUES (270, 63, 'Dhanbari');
INSERT INTO upazilas (id, district_id, name) VALUES (271, 1, 'Bagerhat Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (272, 1, 'Chitalmari');
INSERT INTO upazilas (id, district_id, name) VALUES (273, 1, 'Fakirhat');
INSERT INTO upazilas (id, district_id, name) VALUES (274, 1, 'Kachua');
INSERT INTO upazilas (id, district_id, name) VALUES (275, 1, 'Mollahat');
INSERT INTO upazilas (id, district_id, name) VALUES (276, 1, 'Mongla');
INSERT INTO upazilas (id, district_id, name) VALUES (277, 1, 'Morrelganj');
INSERT INTO upazilas (id, district_id, name) VALUES (278, 1, 'Rampal');
INSERT INTO upazilas (id, district_id, name) VALUES (279, 1, 'Sarankhola');
INSERT INTO upazilas (id, district_id, name) VALUES (280, 11, 'Damurhuda');
INSERT INTO upazilas (id, district_id, name) VALUES (281, 11, 'Chuadanga Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (282, 11, 'Jibannagar');
INSERT INTO upazilas (id, district_id, name) VALUES (283, 11, 'Alamdanga');
INSERT INTO upazilas (id, district_id, name) VALUES (284, 23, 'Abhaynagar');
INSERT INTO upazilas (id, district_id, name) VALUES (285, 23, 'Keshabpur');
INSERT INTO upazilas (id, district_id, name) VALUES (286, 23, 'Bagherpara');
INSERT INTO upazilas (id, district_id, name) VALUES (287, 23, 'Jessore Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (288, 23, 'Chaugachha');
INSERT INTO upazilas (id, district_id, name) VALUES (289, 23, 'Manirampur');
INSERT INTO upazilas (id, district_id, name) VALUES (290, 23, 'Jhikargachha');
INSERT INTO upazilas (id, district_id, name) VALUES (291, 23, 'Sharsha');
INSERT INTO upazilas (id, district_id, name) VALUES (292, 25, 'Jhenaidah Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (293, 25, 'Maheshpur');
INSERT INTO upazilas (id, district_id, name) VALUES (294, 25, 'Kaliganj');
INSERT INTO upazilas (id, district_id, name) VALUES (295, 25, 'Kotchandpur');
INSERT INTO upazilas (id, district_id, name) VALUES (296, 25, 'Shailkupa');
INSERT INTO upazilas (id, district_id, name) VALUES (297, 25, 'Harinakunda');
INSERT INTO upazilas (id, district_id, name) VALUES (298, 28, 'Terokhada');
INSERT INTO upazilas (id, district_id, name) VALUES (299, 28, 'Batiaghata');
INSERT INTO upazilas (id, district_id, name) VALUES (300, 28, 'Dacope');
INSERT INTO upazilas (id, district_id, name) VALUES (301, 28, 'Dumuria');
INSERT INTO upazilas (id, district_id, name) VALUES (302, 28, 'Dighalia');
INSERT INTO upazilas (id, district_id, name) VALUES (303, 28, 'Koyra');
INSERT INTO upazilas (id, district_id, name) VALUES (304, 28, 'Paikgachha');
INSERT INTO upazilas (id, district_id, name) VALUES (305, 28, 'Phultala');
INSERT INTO upazilas (id, district_id, name) VALUES (306, 28, 'Rupsa');
INSERT INTO upazilas (id, district_id, name) VALUES (307, 31, 'Kushtia Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (308, 31, 'Kumarkhali');
INSERT INTO upazilas (id, district_id, name) VALUES (309, 31, 'Daulatpur');
INSERT INTO upazilas (id, district_id, name) VALUES (310, 31, 'Mirpur');
INSERT INTO upazilas (id, district_id, name) VALUES (311, 31, 'Bheramara');
INSERT INTO upazilas (id, district_id, name) VALUES (312, 31, 'Khoksa');
INSERT INTO upazilas (id, district_id, name) VALUES (313, 35, 'Magura Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (314, 35, 'Mohammadpur');
INSERT INTO upazilas (id, district_id, name) VALUES (315, 35, 'Shalikha');
INSERT INTO upazilas (id, district_id, name) VALUES (316, 35, 'Sreepur');
INSERT INTO upazilas (id, district_id, name) VALUES (317, 37, 'Gangni');
INSERT INTO upazilas (id, district_id, name) VALUES (318, 37, 'Mujibnagar');
INSERT INTO upazilas (id, district_id, name) VALUES (319, 37, 'Meherpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (320, 42, 'Narail Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (321, 42, 'Lohagara');
INSERT INTO upazilas (id, district_id, name) VALUES (322, 42, 'Kalia');
INSERT INTO upazilas (id, district_id, name) VALUES (323, 57, 'Satkhira Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (324, 57, 'Assasuni');
INSERT INTO upazilas (id, district_id, name) VALUES (325, 57, 'Debhata');
INSERT INTO upazilas (id, district_id, name) VALUES (326, 57, 'Tala');
INSERT INTO upazilas (id, district_id, name) VALUES (327, 57, 'Kalaroa');
INSERT INTO upazilas (id, district_id, name) VALUES (328, 57, 'Kaliganj');
INSERT INTO upazilas (id, district_id, name) VALUES (329, 57, 'Shyamnagar');
INSERT INTO upazilas (id, district_id, name) VALUES (330, 6, 'Adamdighi');
INSERT INTO upazilas (id, district_id, name) VALUES (331, 6, 'Bogra Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (332, 6, 'Sherpur');
INSERT INTO upazilas (id, district_id, name) VALUES (333, 6, 'Dhunat');
INSERT INTO upazilas (id, district_id, name) VALUES (334, 6, 'Dhupchanchia');
INSERT INTO upazilas (id, district_id, name) VALUES (335, 6, 'Gabtali');
INSERT INTO upazilas (id, district_id, name) VALUES (336, 6, 'Kahaloo');
INSERT INTO upazilas (id, district_id, name) VALUES (337, 6, 'Nandigram');
INSERT INTO upazilas (id, district_id, name) VALUES (338, 6, 'Sahajanpur');
INSERT INTO upazilas (id, district_id, name) VALUES (339, 6, 'Sariakandi');
INSERT INTO upazilas (id, district_id, name) VALUES (340, 6, 'Shibganj');
INSERT INTO upazilas (id, district_id, name) VALUES (341, 6, 'Sonatala');
INSERT INTO upazilas (id, district_id, name) VALUES (342, 26, 'Joypurhat Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (343, 26, 'Akkelpur');
INSERT INTO upazilas (id, district_id, name) VALUES (344, 26, 'Kalai');
INSERT INTO upazilas (id, district_id, name) VALUES (345, 26, 'Khetlal');
INSERT INTO upazilas (id, district_id, name) VALUES (346, 26, 'Panchbibi');
INSERT INTO upazilas (id, district_id, name) VALUES (347, 41, 'Naogaon Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (348, 41, 'Mohadevpur');
INSERT INTO upazilas (id, district_id, name) VALUES (349, 41, 'Manda');
INSERT INTO upazilas (id, district_id, name) VALUES (350, 41, 'Niamatpur');
INSERT INTO upazilas (id, district_id, name) VALUES (351, 41, 'Atrai');
INSERT INTO upazilas (id, district_id, name) VALUES (352, 41, 'Raninagar');
INSERT INTO upazilas (id, district_id, name) VALUES (353, 41, 'Patnitala');
INSERT INTO upazilas (id, district_id, name) VALUES (354, 41, 'Dhamoirhat');
INSERT INTO upazilas (id, district_id, name) VALUES (355, 41, 'Sapahar');
INSERT INTO upazilas (id, district_id, name) VALUES (356, 41, 'Porsha');
INSERT INTO upazilas (id, district_id, name) VALUES (357, 41, 'Badalgachhi');
INSERT INTO upazilas (id, district_id, name) VALUES (358, 45, 'Natore Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (359, 45, 'Baraigram');
INSERT INTO upazilas (id, district_id, name) VALUES (360, 45, 'Bagatipara');
INSERT INTO upazilas (id, district_id, name) VALUES (361, 45, 'Lalpur');
INSERT INTO upazilas (id, district_id, name) VALUES (362, 45, 'Gurudaspur');
INSERT INTO upazilas (id, district_id, name) VALUES (363, 45, 'Singra');
INSERT INTO upazilas (id, district_id, name) VALUES (364, 9, 'Bholahat');
INSERT INTO upazilas (id, district_id, name) VALUES (365, 9, 'Gomastapur');
INSERT INTO upazilas (id, district_id, name) VALUES (366, 9, 'Nachole');
INSERT INTO upazilas (id, district_id, name) VALUES (367, 9, 'Chapainawabganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (368, 9, 'Shibganj');
INSERT INTO upazilas (id, district_id, name) VALUES (369, 49, 'Atgharia');
INSERT INTO upazilas (id, district_id, name) VALUES (370, 49, 'Bera');
INSERT INTO upazilas (id, district_id, name) VALUES (371, 49, 'Bhangura');
INSERT INTO upazilas (id, district_id, name) VALUES (372, 49, 'Chatmohar');
INSERT INTO upazilas (id, district_id, name) VALUES (373, 49, 'Faridpur');
INSERT INTO upazilas (id, district_id, name) VALUES (374, 49, 'Ishwardi');
INSERT INTO upazilas (id, district_id, name) VALUES (375, 49, 'Pabna Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (376, 49, 'Santhia');
INSERT INTO upazilas (id, district_id, name) VALUES (377, 49, 'Sujanagar');
INSERT INTO upazilas (id, district_id, name) VALUES (378, 54, 'Bagha');
INSERT INTO upazilas (id, district_id, name) VALUES (379, 54, 'Bagmara');
INSERT INTO upazilas (id, district_id, name) VALUES (380, 54, 'Charghat');
INSERT INTO upazilas (id, district_id, name) VALUES (381, 54, 'Durgapur');
INSERT INTO upazilas (id, district_id, name) VALUES (382, 54, 'Godagari');
INSERT INTO upazilas (id, district_id, name) VALUES (383, 54, 'Mohanpur');
INSERT INTO upazilas (id, district_id, name) VALUES (384, 54, 'Paba');
INSERT INTO upazilas (id, district_id, name) VALUES (385, 54, 'Puthia');
INSERT INTO upazilas (id, district_id, name) VALUES (386, 54, 'Tanore');
INSERT INTO upazilas (id, district_id, name) VALUES (387, 60, 'Sirajganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (388, 60, 'Belkuchi');
INSERT INTO upazilas (id, district_id, name) VALUES (389, 60, 'Chauhali');
INSERT INTO upazilas (id, district_id, name) VALUES (390, 60, 'Kamarkhanda');
INSERT INTO upazilas (id, district_id, name) VALUES (391, 60, 'Kazipur');
INSERT INTO upazilas (id, district_id, name) VALUES (392, 60, 'Raiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (393, 60, 'Shahjadpur');
INSERT INTO upazilas (id, district_id, name) VALUES (394, 60, 'Tarash');
INSERT INTO upazilas (id, district_id, name) VALUES (395, 60, 'Ullahpara');
INSERT INTO upazilas (id, district_id, name) VALUES (396, 15, 'Birampur');
INSERT INTO upazilas (id, district_id, name) VALUES (397, 15, 'Birganj');
INSERT INTO upazilas (id, district_id, name) VALUES (398, 15, 'Biral');
INSERT INTO upazilas (id, district_id, name) VALUES (399, 15, 'Bochaganj');
INSERT INTO upazilas (id, district_id, name) VALUES (400, 15, 'Chirirbandar');
INSERT INTO upazilas (id, district_id, name) VALUES (401, 15, 'Phulbari');
INSERT INTO upazilas (id, district_id, name) VALUES (402, 15, 'Ghoraghat');
INSERT INTO upazilas (id, district_id, name) VALUES (403, 15, 'Hakimpur');
INSERT INTO upazilas (id, district_id, name) VALUES (404, 15, 'Kaharole');
INSERT INTO upazilas (id, district_id, name) VALUES (405, 15, 'Khansama');
INSERT INTO upazilas (id, district_id, name) VALUES (406, 15, 'Dinajpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (407, 15, 'Nawabganj');
INSERT INTO upazilas (id, district_id, name) VALUES (408, 15, 'Parbatipur');
INSERT INTO upazilas (id, district_id, name) VALUES (409, 18, 'Fulchhari');
INSERT INTO upazilas (id, district_id, name) VALUES (410, 18, 'Gaibandha Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (411, 18, 'Gobindaganj');
INSERT INTO upazilas (id, district_id, name) VALUES (412, 18, 'Palashbari');
INSERT INTO upazilas (id, district_id, name) VALUES (413, 18, 'Sadullapur');
INSERT INTO upazilas (id, district_id, name) VALUES (414, 18, 'Saghata');
INSERT INTO upazilas (id, district_id, name) VALUES (415, 18, 'Sundarganj');
INSERT INTO upazilas (id, district_id, name) VALUES (416, 30, 'Kurigram Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (417, 30, 'Nageshwari');
INSERT INTO upazilas (id, district_id, name) VALUES (418, 30, 'Bhurungamari');
INSERT INTO upazilas (id, district_id, name) VALUES (419, 30, 'Phulbari');
INSERT INTO upazilas (id, district_id, name) VALUES (420, 30, 'Rajarhat');
INSERT INTO upazilas (id, district_id, name) VALUES (421, 30, 'Ulipur');
INSERT INTO upazilas (id, district_id, name) VALUES (422, 30, 'Chilmari');
INSERT INTO upazilas (id, district_id, name) VALUES (423, 30, 'Rowmari');
INSERT INTO upazilas (id, district_id, name) VALUES (424, 30, 'Char Rajibpur');
INSERT INTO upazilas (id, district_id, name) VALUES (425, 33, 'Lalmonirhat Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (426, 33, 'Aditmari');
INSERT INTO upazilas (id, district_id, name) VALUES (427, 33, 'Kaliganj');
INSERT INTO upazilas (id, district_id, name) VALUES (428, 33, 'Hatibandha');
INSERT INTO upazilas (id, district_id, name) VALUES (429, 33, 'Patgram');
INSERT INTO upazilas (id, district_id, name) VALUES (430, 47, 'Nilphamari Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (431, 47, 'Saidpur');
INSERT INTO upazilas (id, district_id, name) VALUES (432, 47, 'Jaldhaka');
INSERT INTO upazilas (id, district_id, name) VALUES (433, 47, 'Kishoreganj');
INSERT INTO upazilas (id, district_id, name) VALUES (434, 47, 'Domar');
INSERT INTO upazilas (id, district_id, name) VALUES (435, 47, 'Dimla');
INSERT INTO upazilas (id, district_id, name) VALUES (436, 50, 'Panchagarh Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (437, 50, 'Debiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (438, 50, 'Boda');
INSERT INTO upazilas (id, district_id, name) VALUES (439, 50, 'Atwari');
INSERT INTO upazilas (id, district_id, name) VALUES (440, 50, 'Tetulia');
INSERT INTO upazilas (id, district_id, name) VALUES (441, 56, 'Badarganj');
INSERT INTO upazilas (id, district_id, name) VALUES (442, 56, 'Mithapukur');
INSERT INTO upazilas (id, district_id, name) VALUES (443, 56, 'Gangachara');
INSERT INTO upazilas (id, district_id, name) VALUES (444, 56, 'Kaunia');
INSERT INTO upazilas (id, district_id, name) VALUES (445, 56, 'Rangpur Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (446, 56, 'Pirgachha');
INSERT INTO upazilas (id, district_id, name) VALUES (447, 56, 'Pirganj');
INSERT INTO upazilas (id, district_id, name) VALUES (448, 56, 'Taraganj');
INSERT INTO upazilas (id, district_id, name) VALUES (449, 64, 'Thakurgaon Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (450, 64, 'Pirganj');
INSERT INTO upazilas (id, district_id, name) VALUES (451, 64, 'Baliadangi');
INSERT INTO upazilas (id, district_id, name) VALUES (452, 64, 'Haripur');
INSERT INTO upazilas (id, district_id, name) VALUES (453, 64, 'Ranisankail');
INSERT INTO upazilas (id, district_id, name) VALUES (454, 21, 'Ajmiriganj');
INSERT INTO upazilas (id, district_id, name) VALUES (455, 21, 'Baniachang');
INSERT INTO upazilas (id, district_id, name) VALUES (456, 21, 'Bahubal');
INSERT INTO upazilas (id, district_id, name) VALUES (457, 21, 'Chunarughat');
INSERT INTO upazilas (id, district_id, name) VALUES (458, 21, 'Habiganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (459, 21, 'Lakhai');
INSERT INTO upazilas (id, district_id, name) VALUES (460, 21, 'Madhabpur');
INSERT INTO upazilas (id, district_id, name) VALUES (461, 21, 'Nabiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (462, 21, 'Shaistagonj');
INSERT INTO upazilas (id, district_id, name) VALUES (463, 38, 'Moulvibazar Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (464, 38, 'Barlekha');
INSERT INTO upazilas (id, district_id, name) VALUES (465, 38, 'Juri');
INSERT INTO upazilas (id, district_id, name) VALUES (466, 38, 'Kamalganj');
INSERT INTO upazilas (id, district_id, name) VALUES (467, 38, 'Kulaura');
INSERT INTO upazilas (id, district_id, name) VALUES (468, 38, 'Rajnagar');
INSERT INTO upazilas (id, district_id, name) VALUES (469, 38, 'Sreemangal');
INSERT INTO upazilas (id, district_id, name) VALUES (470, 61, 'Bishwamvarpur');
INSERT INTO upazilas (id, district_id, name) VALUES (471, 61, 'Chhatak');
INSERT INTO upazilas (id, district_id, name) VALUES (472, 61, 'Derai');
INSERT INTO upazilas (id, district_id, name) VALUES (473, 61, 'Dharampasha');
INSERT INTO upazilas (id, district_id, name) VALUES (474, 61, 'Dowarabazar');
INSERT INTO upazilas (id, district_id, name) VALUES (475, 61, 'Jagannathpur');
INSERT INTO upazilas (id, district_id, name) VALUES (476, 61, 'Jamalganj');
INSERT INTO upazilas (id, district_id, name) VALUES (477, 61, 'Sulla');
INSERT INTO upazilas (id, district_id, name) VALUES (478, 61, 'Sunamganj Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (479, 61, 'Shanthiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (480, 61, 'Tahirpur');
INSERT INTO upazilas (id, district_id, name) VALUES (481, 62, 'Sylhet Sadar');
INSERT INTO upazilas (id, district_id, name) VALUES (482, 62, 'Beanibazar');
INSERT INTO upazilas (id, district_id, name) VALUES (483, 62, 'Bishwanath');
INSERT INTO upazilas (id, district_id, name) VALUES (484, 62, 'Dakshin Surma');
INSERT INTO upazilas (id, district_id, name) VALUES (485, 62, 'Balaganj');
INSERT INTO upazilas (id, district_id, name) VALUES (486, 62, 'Companiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (487, 62, 'Fenchuganj');
INSERT INTO upazilas (id, district_id, name) VALUES (488, 62, 'Golapganj');
INSERT INTO upazilas (id, district_id, name) VALUES (489, 62, 'Gowainghat');
INSERT INTO upazilas (id, district_id, name) VALUES (490, 62, 'Jaintiapur');
INSERT INTO upazilas (id, district_id, name) VALUES (491, 62, 'Kanaighat');
INSERT INTO upazilas (id, district_id, name) VALUES (492, 62, 'Zakiganj');
INSERT INTO upazilas (id, district_id, name) VALUES (493, 62, 'Osmaninagar');
INSERT INTO upazilas (id, district_id, name) VALUES (494, 13, 'Eidgaon');
INSERT INTO upazilas (id, district_id, name) VALUES (495, 61, 'Madhyanagar');

-- ----------------------------
-- Data: thanas
-- ----------------------------
INSERT INTO thanas (id, district_id, name) VALUES (1, 14, 'Kotwali');
INSERT INTO thanas (id, district_id, name) VALUES (2, 14, 'Mohammadpur');
INSERT INTO thanas (id, district_id, name) VALUES (3, 14, 'Lalbagh');
INSERT INTO thanas (id, district_id, name) VALUES (4, 14, 'Sutrapur');
INSERT INTO thanas (id, district_id, name) VALUES (5, 14, 'Motijheel');
INSERT INTO thanas (id, district_id, name) VALUES (6, 14, 'Demra');
INSERT INTO thanas (id, district_id, name) VALUES (7, 14, 'Sabujbagh');
INSERT INTO thanas (id, district_id, name) VALUES (8, 14, 'Mirpur');
INSERT INTO thanas (id, district_id, name) VALUES (9, 14, 'Gulshan');
INSERT INTO thanas (id, district_id, name) VALUES (10, 14, 'Uttara');
INSERT INTO thanas (id, district_id, name) VALUES (11, 14, 'Pallabi');
INSERT INTO thanas (id, district_id, name) VALUES (12, 14, 'Cantonment');
INSERT INTO thanas (id, district_id, name) VALUES (13, 14, 'Dhanmondi');
INSERT INTO thanas (id, district_id, name) VALUES (14, 14, 'Tejgaon');
INSERT INTO thanas (id, district_id, name) VALUES (15, 14, 'Ramna');
INSERT INTO thanas (id, district_id, name) VALUES (16, 10, 'Kotwali');
INSERT INTO thanas (id, district_id, name) VALUES (17, 10, 'Panchlaish');
INSERT INTO thanas (id, district_id, name) VALUES (18, 10, 'Chandgaon');
INSERT INTO thanas (id, district_id, name) VALUES (19, 10, 'Bandar');
INSERT INTO thanas (id, district_id, name) VALUES (20, 10, 'Pahartali');
INSERT INTO thanas (id, district_id, name) VALUES (21, 10, 'Double Mooring');
INSERT INTO thanas (id, district_id, name) VALUES (22, 54, 'Boalia');
INSERT INTO thanas (id, district_id, name) VALUES (23, 54, 'Rajpara');
INSERT INTO thanas (id, district_id, name) VALUES (24, 28, 'Khulna Sadar');
INSERT INTO thanas (id, district_id, name) VALUES (25, 28, 'Sonadanga');
INSERT INTO thanas (id, district_id, name) VALUES (26, 28, 'Daulatpur');
