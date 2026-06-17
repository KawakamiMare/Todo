CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`progress` text,
	`description` text,
	`deadline` text,
	`priority` text,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
