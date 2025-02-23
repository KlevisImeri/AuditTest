BEGIN TRANSACTION;


-- Insert sample houses
INSERT INTO Houses (Address) VALUES
('Haus A, Berliner Str. 1'),
('Haus B, Münchener Weg 5'),
('Haus C, Hamburger Allee 12'),
('Haus D, Kölner Platz 3'),
('Haus E, Frankfurter Ring 8'),
('Haus F, Dresdner Strasse 15'),
('Haus G, Stuttgarter Weg 7'),
('Haus H, Dortmunder Allee 20');

-- Insert communication books
INSERT INTO Books (houseID, year, month, day) VALUES
(1, 2024, 7, 1),
(1, 2024, 8, 1),
(1, 2024, 9, 1),
(2, 2024, 7, 1),
(2, 2024, 8, 1),
(2, 2024, 9, 1),
(3, 2024, 7, 1),
(3, 2024, 8, 1),
(3, 2024, 9, 1),
(4, 2024, 7, 1),
(4, 2024, 8, 1),
(4, 2024, 9, 1),
(5, 2024, 7, 1),
(5, 2024, 8, 1),
(5, 2024, 9, 1),
(6, 2024, 7, 1),
(6, 2024, 8, 1),
(6, 2024, 9, 1),
(7, 2024, 7, 1),
(7, 2024, 8, 1),
(7, 2024, 9, 1),
(8, 2024, 7, 1),
(8, 2024, 8, 1),
(8, 2024, 9, 1);

-- Insert entries
INSERT INTO Entries (
  bookId,
  roomNumber,
  repairDescription,
  noticedDate,
  completedDate,
  emergencyStartTime,
  emergencyEndTime,
  emergencyPersonCount,
  travelInfo,
  feedbackToOffice
) VALUES
-- Entries for first communication book (Haus A, July 2024)
(1, '101', 'Heizungsausfall', '2024-07-05', '2024-07-06', NULL, NULL, NULL, NULL, NULL),
(1, NULL, NULL, NULL, NULL, '18:00', '20:00', 2, NULL, NULL),

-- Entries for second communication book (Haus A, August 2024)
(2, '102', 'Dachreparatur', '2024-08-10', '2024-08-12', NULL, NULL, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, '22:00', '23:30', 1, NULL, NULL),

-- Entries for third communication book (Haus A, September 2024)
(3, '103', 'Fenstergriff kaputt', '2024-09-14', '2024-09-14', NULL, NULL, NULL, NULL, NULL),

-- Entries for fourth communication book (Haus B, July 2024)
(4, '205', 'Wasserrohrbruch', '2024-07-12', '2024-07-12', '08:30', '10:00', 3, NULL, NULL),

-- Entries for fifth communication book (Haus B, August 2024)
(5, '207', 'Abwasserüberlauf', '2024-08-19', '2024-08-19', '18:30', '20:00', 2, NULL, NULL),

-- Entries for sixth communication book (Haus B, September 2024)
(6, '209', 'Wanddurchbruch', '2024-09-17', '2024-09-19', NULL, NULL, NULL, NULL, NULL),

-- Entries for seventh communication book (Haus C, July 2024)
(7, '310', 'Stromausfall', '2024-07-19', '2024-07-19', '22:15', '23:45', 1, NULL, NULL),

-- Entries for eighth communication book (Haus C, August 2024)
(8, '315', 'Türschloss defekt', '2024-08-18', '2024-08-18', '20:00', '21:30', 2, NULL, NULL),

-- Entries for ninth communication book (Haus C, September 2024)
(9, '317', 'Elektrische Rollläden', '2024-09-25', '2024-09-26', '08:00', '09:30', 1, NULL, NULL),

-- Entries for tenth communication book (Haus D, July 2024)
(10, '402', 'Aufzugdefekt', '2024-07-26', '2024-07-27', NULL, NULL, NULL, NULL, NULL),

-- Entries for eleventh communication book (Haus D, August 2024)
(11, '408', 'Balkongeländer locker', '2024-08-22', '2024-08-23', NULL, NULL, NULL, NULL, NULL),

-- Entries for twelfth communication book (Haus D, September 2024)
(12, '412', 'Müllschlucker blockiert', '2024-09-29', '2024-09-30', NULL, NULL, NULL, NULL, NULL),

-- Entries for thirteenth communication book (Haus E, July 2024)
(13, '501', 'Brandmelder defekt', '2024-07-03', '2024-07-03', '14:00', '15:30', 1, NULL, NULL),

-- Entries for fourteenth communication book (Haus E, August 2024)
(14, '503', 'Heizkörper undicht', '2024-08-11', NULL, '07:15', '08:45', 2, NULL, NULL),

-- Entries for fifteenth communication book (Haus E, September 2024)
(15, '505', 'Schimmelbildung', '2024-09-21', '2024-09-22', NULL, NULL, NULL, NULL, NULL),

-- Entries for sixteenth communication book (Haus F, July 2024)
(16, '601', 'Fenster klemmt', '2024-07-08', NULL, NULL, NULL, NULL, NULL, NULL),

-- Entries for seventeenth communication book (Haus F, August 2024)
(17, '605', 'Rauchmelder Batterie', '2024-08-30', '2024-08-30', NULL, NULL, NULL, NULL, NULL),

-- Entries for eighteenth communication book (Haus F, September 2024)
(18, '610', 'Kellerflutung', '2024-09-05', '2024-09-06', '23:45', '02:15', 3, NULL, NULL),

-- Entries for nineteenth communication book (Haus G, July 2024)
(19, '701', 'Schimmelbildung', '2024-07-14', '2024-07-15', NULL, NULL, NULL, NULL, NULL),

-- Entries for twentieth communication book (Haus G, August 2024)
(20, '710', 'Gartenbewässerung defekt', '2024-08-21', '2024-08-22', '09:45', '11:15', 1, NULL, NULL),

-- Entries for twenty-first communication book (Haus G, September 2024)
(21, '715', 'Garagentor defekt', '2024-09-28', NULL, NULL, NULL, NULL, NULL, NULL),

-- Entries for twenty-second communication book (Haus H, July 2024)
(22, '801', 'Burst water pipe', '2024-07-15', '2024-07-15', '03:30', '05:45', 2, NULL, NULL),

-- Entries for twenty-third communication book (Haus H, August 2024)
(23, '810', 'Power outage in east wing', '2024-08-19', '2024-08-19', '19:15', '21:00', 3, NULL, NULL),

-- Entries for twenty-fourth communication book (Haus H, September 2024)
(24, '815', 'Broken entry door lock', '2024-09-25', '2024-09-25', '22:00', '23:30', 1, NULL, NULL);

COMMIT;
