--
-- 1xN relation ITEM-NOTE fk
--

ALTER TABLE public.item ADD CONSTRAINT
note_fk FOREIGN KEY (note) REFERENCES
"note" (id) ON UPDATE CASCADE ON DELETE
RESTRICT;

--
-- 1xN relation NOTE-USER fk
--

ALTER TABLE public.note ADD CONSTRAINT
user_fk FOREIGN KEY (owner) REFERENCES
"user" (id) ON UPDATE CASCADE ON DELETE
RESTRICT;

--
-- 1xN relation TAG-USER fk
--

ALTER TABLE public.tag ADD CONSTRAINT
user_fk FOREIGN KEY (owner) REFERENCES
"user" (id) ON UPDATE CASCADE ON DELETE
RESTRICT;

--
-- MxN relation NOTE-TAG fks
--

ALTER TABLE public.note_tags__tag_notes ADD CONSTRAINT
note_fk FOREIGN KEY (note_tags) REFERENCES
"note" (id) ON UPDATE CASCADE ON DELETE
RESTRICT;

ALTER TABLE public.note_tags__tag_notes ADD CONSTRAINT
"tag_fk" FOREIGN KEY (tag_notes) REFERENCES
tag (id) ON UPDATE CASCADE ON DELETE
RESTRICT;

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: notes
--

COPY public."user" ("createdAt", "updatedAt", id, username, email, password) FROM stdin;
1575302715244	1575302715244	4	root	root@usp.br	$2a$10$eEyjqtv40cgYp1OB7whCe.Q40VMGg53MlIXq2Swi32eY1lcoceXGa
\.

--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: notes
--

COPY public.tag ("createdAt", "updatedAt", id, name, owner) FROM stdin;
1575302752984	1575302752984	1	tag 1	4
1575302816709	1575302816709	2	tag 2	4
\.

--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: notes
--

COPY public.note ("createdAt", "updatedAt", id, title, type, owner) FROM stdin;
1575302727453	1575302731849	2		lista	4
1575302732833	1575302759504	3	lista 1	lista	4
1575302760785	1575302819698	4	tarefas 1	tarefas	4
1575302822975	1575302846558	5	nota 1	nota	4
\.

--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: notes
--

COPY public.item ("createdAt", "updatedAt", id, description, checked, ends, note) FROM stdin;
1575302740320	1575302740320	4	item 1	f	\N	3
1575302747720	1575302748746	5	item riscado 1	t	\N	3
1575302798678	1575302798678	6	tarefa 1	f	1576850400000	4
1575302811838	1575302811838	7	tarefa concluida 1	f	-27080300552000	4
1575302839540	1575302846613	8	conteúdo nota 1	f	\N	5
\.

--
-- Data for Name: note_tags__tag_notes; Type: TABLE DATA; Schema: public; Owner: notes
--

COPY public.note_tags__tag_notes (id, note_tags, tag_notes) FROM stdin;
1	3	1
2	4	1
3	4	2
4	5	2
5	5	1
\.

SELECT pg_catalog.setval('public.item_id_seq', 8, true);
SELECT pg_catalog.setval('public.note_id_seq', 5, true);
SELECT pg_catalog.setval('public.note_tags__tag_notes_id_seq', 5, true);
SELECT pg_catalog.setval('public.tag_id_seq', 2, true);
SELECT pg_catalog.setval('public.user_id_seq', 4, true);