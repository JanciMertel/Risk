 
> *permanentní tabulky aplikace* 
 
> *zakladní informace o obsahu mapy* 
### table **maps**
 - **id** int2 NOT NULL,
 - **name** varchar(50),
 - **fid** int4,
 - **feature** varchar(50),
 - **dimension** varchar(10),
 - **color** varchar(50),
 - **signature** float8,
 - **priority** int2,
 - **propagation** float8
---
 
> *sada omezení, která musí být splněna* 
### table **constraints**
 - **id** int2 NOT NULL DEFAULT nextval('constrains_id_seq'::regclass),
 - **map** int4,
 - **conflict** varchar(50),
 - **name** varchar(50),
 - **ffeature** varchar(50),
 - **rfeature** varchar(50),
 - **relation** varchar(50),
 - **predicate** varchar(50),
 - **value** float8
---
 
> *vzory struktur figurujících v pravidlech* 
### table **structuretypes**
 - **id** int2 NOT NULL DEFAULT nextval('structuretypes_id_seq'::regclass),
 - **name** varchar(50),
 - **procedure** varchar(255),
 - **description** varchar(500)
---
 
> *pravidla generalizace, jsou vázana na příslušné kontexty a zapojené struktury* 
### table **rules**
 - **id** int2 NOT NULL DEFAULT nextval('rules_id_seq'::regclass),
 - **origin** varchar(50),
 - **map** int2,
 - **ffeature** varchar(50),
 - **context** int4,
 - **operator** varchar(50),
 - **minpar** float8,
 - **maxpar** float8,
 - **step** float8
---
 
> *kontexty, jednak definované v pravidlech, tak i zobecněné z měření úspěšně řešených clusterů* 
### table **contexts**
 - **id** int4 NOT NULL DEFAULT nextval('contexts_id_seq'::regclass),
 - **name** varchar(50),
 - **origin** varchar(50),
 - **ffeature** varchar(50),
 - **rfeature** varchar(50),
 - **relation** varchar(50),
 - **value** float8,
 - **fstructure** varchar(50),
 - **fstructposition** varchar(50)
---
 
> *struktury zmíněné v pravidlech nebo navázané na kontexty získané zobecněním úspěšných měření* 
### table **contextstructures**
 - **id** int4,
 - **contextid** int4,
 - **feature** varchar(50),
 - **structure** varchar(50),
 - **position** varchar(50)
---
 
> *seznam pgplsql funkcí aplikace* 
### table **functions**
 - **id** int2 NOT NULL DEFAULT nextval('functions_id_seq'::regclass),
 - **name** varchar(50),
 - **type** varchar(50),
 - **group** varchar(50),
 - **variable** varchar(50),
 - **input** varchar(255),
 - **description** varchar(500)
---
 
> *seznam enumerací vyskytující se v tabulkách* 
### table **enumerations**
 - **id** int2 NOT NULL DEFAULT nextval('enumerations_id_seq'::regclass),
 - **parameter** varchar(50),
 - **table** varchar(10),
 - **value** varchar(50),
 - **description** varchar(255)
---
 
> *informace o zpracovaných clusterech* 
### table **stats**
 - **clustid** int8 NOT NULL DEFAULT nextval('stats_clustid_seq'::regclass),
 - **size** int2,
 - **map** int2,
 - **context** int4,
 - **complication** varchar(50),
 - **totaliterations** int8
---
 
> *informace o úspěšnosti jednotlivých operátorů* 
### table **opranks**
 - **opid** int2 NOT NULL,
 - **feature** varchar(50),
 - **context** varchar(50),
 - **conflict** varchar(50),
 - **success** int4,
 - **comment** varchar(255)
---
 
> *tabulky spojené s blokem dat* 
 
> *vybrané topologické vazby jejichž zachování je nutné pro konzistenci mapy* 
### table **topos**
 - **id** int4 NOT NULL DEFAULT nextval('topos_id_seq'::regclass),
 - **felement** int8,
 - **ffeature** varchar(50),
 - **relation** varchar(50),
 - **relement** int8,
 - **rfeature** varchar(50)
---
 
> *identifikované struktury* 
### table **structures**
 - **sid** int2,
 - **structuretype** int2,
 - **elid** int8,
 - **position** varchar(50)
---
 
> *identifikované shluky elementů související s lokálním porušením omezení* 
### table **clusters**
 - **id** int4 NOT NULL DEFAULT nextval('clusters_id_seq'::regclass),
 - **member** int4,
 - **type** varchar(50),
 - **conflict** varchar(50)
---
 
> *tabulky spojené s řešením jednotlivých clusterů* 
 
> *elementy v řešeném clusteru* 
### table **selection**
 - **cluster** int4,
 - **elid** int8,
 - **geometry** geometry,
 - **type** varchar(50)
---
 
> *první a nejlepší dosavadní modifikace selection* 
### table **solution_zero**
 - **cluster** int4,
 - **elid** int8,
 - **geometry** geometry,
 - **type** varchar(50),
 - **violation** float8
---
 
> *aktuální modifikace selection* 
### table **solution**
 - **cluster** int4,
 - **elid** int8,
 - **geometry** geometry,
 - **type** varchar(50),
 - **violation** float8
---
 
> *měření vztahů objektů v selection* 
### table **measures**
 - **id** int4 NOT NULL DEFAULT nextval('measures_id_seq'::regclass),
 - **cluster** int4,
 - **felement** int4,
 - **ffeature** varchar(50),
 - **relement** int8,
 - **rfeature** varchar(50),
 - **relation** varchar(50),
 - **value** float8
---
