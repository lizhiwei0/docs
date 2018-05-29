
CREATE TABLE `department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `code` varchar(128) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `last_update_time` bigint(20) DEFAULT NULL,
  `creator_id` bigint(20) DEFAULT NULL,
  `updator_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE node_execution (
id BIGINT  primary key auto_increment,
execution_id varchar(32) not null ,
node_id integer not null,
finish_size integer,
commit_size integer,
total_request_size integer,
start_time bigint,
finish_time bigint,
create_time bigint
);


CREATE TABLE `execution_info` (
  `execution_id` varchar(32) NOT NULL,
  `finish_size` int(11) DEFAULT NULL,
  `commit_size` int(11) DEFAULT NULL,
  `total_request_size` int(11) DEFAULT NULL,
  `start_time` bigint(20) DEFAULT NULL,
  `finish_time` bigint(20) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`execution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `cron_expression` varchar(32) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `last_update_time` bigint(20) DEFAULT NULL,
  `owner` varchar(64) DEFAULT NULL,
  `authentication` varchar(256) DEFAULT NULL,
  `worker_nodes` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;


CREATE TABLE `job_execution` (
  `job_id` bigint(20) DEFAULT NULL,
  `execution_id` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_url` (
  `job_id` bigint(20) DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `rank_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `score_id` bigint(20) DEFAULT NULL,
  `dimension` varchar(512) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `rank_value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_rank_record_score_id` (`score_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2412607 DEFAULT CHARSET=utf8;

CREATE TABLE `score` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `benchmark_id` varchar(36) NOT NULL,
  `url` varchar(512) NOT NULL,
  `network_type` varchar(32) DEFAULT 'LAN',
  `detailed_report_url` varchar(512) DEFAULT NULL,
  `execution_id` varchar(32) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `addition_value` varchar(32) DEFAULT NULL,
  `create_date` char(8) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `worker_node` int(11) DEFAULT NULL,
  `associate_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_score_benchmark_id` (`benchmark_id`),
  KEY `index_score_url` (`url`(255)),
  KEY `index_score_create_date` (`create_date`),
  KEY `index_score_create_time` (`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=150854 DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `last_update_time` bigint(20) DEFAULT NULL,
  `creator_id` bigint(20) DEFAULT NULL,
  `updator_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `account_name` varchar(128) DEFAULT NULL,
  `account_password` varchar(128) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `last_update_time` bigint(20) DEFAULT NULL,
  `creator_id` bigint(20) DEFAULT NULL,
  `updator_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `worst_score` (
  `execution_id` varchar(32) DEFAULT NULL,
  `score_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
