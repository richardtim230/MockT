const validUserIDs = [
  "USER101", "2WN6FP", "CEIJ7E", "3IV4RI", "BSIZTQ", "K3RBVK", "XR0QEV",
  "J2DTAN", "ZKWN3U", "9UR3N6", "KNNP24", "3XHF8Z", "R7F0YO", "GIY77W",
  "FB32H6", "X64SH5"
]; // Valid user IDs

let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval;
let remainingTime = 30 * 60; // 20 minutes
let fullName = "";
let userID = "";
let selectedCourseCode = "";

// Predefined question banks by course codes
const questionBanks = {
  "ZOO101-1": [
    
 {
        text: "What is a major factor causing the large size of the ovum compared to spermatozoa?",
        options: ["The amount of DNA.", "The large amount of cytoplasm.", "The thickness of the cell membrane.", "The amount of RNA."],
        correct: 1,
        explanation: "The ovum is significantly larger than a spermatozoon primarily because it contains a large amount of cytoplasm. This cytoplasm is packed with nutrients (yolk), organelles, and other substances necessary to support the early development of the embryo following fertilization. Spermatozoa, on the other hand, focus on motility and delivery of DNA, hence their smaller size."
    }, 
    {
        text: "If an animal lacks both tissues and organs, what can we infer about its complexity?",
        options: ["It can be at the protoplasmic level of organization", "It has a very complex organization", "It has a well-developed organ system", "It can be a unicellular organism"],
        correct: 3,
        explanation: "If an animal lacks tissues and organs, it implies a very simple level of organization. This is most characteristic of unicellular organisms, which are at the protoplasmic or cellular level, where all functions occur within a single cell and/or aggregations."
    },
    {
        text: "What is the implication of the fact that the oocyte is arrested in prophase I before puberty?",
        options: ["The oocyte will not mature until it is stimulated by hormonal signals", "The oocyte will mature only during oogenesis", "The oocyte has to perform its first mitotic division before reaching the tertiary stage", "The oocyte will not be able to perform its first meiotic division"],
         correct: 0,
        explanation: "The arrest of the oocyte in prophase I before puberty is a mechanism to ensure that the oocyte will only mature when the appropriate hormonal signals are present, triggering the subsequent stages of oogenesis and preparing the oocyte for potential fertilization."
    },
    {
        text: "Why is a single, large ovum, as opposed to multiple similar-sized cells, produced during oogenesis?",
        options: ["It enables more rapid cell division", "It makes meiosis more efficient", "It provides a larger nutrient reserve for the developing embryo", "It facilitates fertilization"],
         correct: 2,
        explanation: "Producing a single, large ovum during oogenesis ensures that the ovum has a large nutrient reserve (yolk). This is vital for the early development of the embryo after fertilization, providing the necessary resources before the embryo can acquire its own nutrients."
    },
    {
        text: "In what level of organization would a jellyfish be placed?",
        options: ["Protoplasmic", "Cellular", "Tissue grade", "Organ system"],
        correct: 2,
        explanation: "Jellyfish, being cnidarians, are characterized by a tissue grade of organization. They possess tissues, such as a nerve net, but lack complex organ systems."
    },
    {
        text: "If a species evolves to have more complex organ systems, what is likely to happen to its levels of organization?",
        options: ["It will revert back to tissue-grade level.", "It will lose the levels of organization that it previously possessed.", "It will increase in complexity within the organ-system level", "It will stop developing new levels of organization."],
        correct: 2,
       explanation: "Evolution towards more complex organ systems typically leads to an increase in complexity *within* the organ-system level, with more specialized and integrated organ systems forming to support the organism's functions."
    },
     {
        text: "Animals face similar challenges related to life functions. Does this imply that all animals use the same strategies to overcome these challenges?",
        options: ["Yes, the challenges are universal, so the solutions are identical.", "No, similar challenges do not mean similar strategies.", "There is no information on the strategies that animals use to overcome challenges.", "Similar challenges can be met with different body plans."],
        correct: 1,
        explanation: "While all animals face fundamental challenges like obtaining food and water, removing waste, and reproducing, they have evolved diverse strategies and body plans to overcome them. Similar challenges do not necessitate identical solutions."
    },
    {
        text: "Given that sponges are at the cellular level of organization, what is implied about the level of specialization of their cells?",
        options: ["Their cells are more specialized than most other animals.", "Their cells have no specialization.", "Their cells have some specialization, but are not organized into tissues.", "Their cells have limited specialization, therefore there is a need for tissues."],
        correct: 2,
        explanation: "Sponges at the cellular level have cells that are specialized to some degree, meaning different cells perform different functions. However, they don’t form coordinated tissues in the same way that more complex organisms do. Rather, their cells work independently or in loose aggregations."
    },
    {
        text: "If a species' organs become specialized for multiple functions, what implication does this have for its level of organization?",
        options: ["The level of organization will decrease", "The level of organization remains the same", "The level of organization is likely to remain at tissue-organ", "The level of organization is likely to remain at the organ-system level"],
       correct: 3,
        explanation: "If a species' organs become specialized for multiple functions, it suggests a high level of integration between organ systems. This would place the organism at an advanced organ-system level of organization."
    },
    {
        text: "What can be inferred about the relationship between increased complexity and the number of cell types in animals?",
        options: ["There is no relationship between these concepts", "Increased complexity decreases the number of cell types", "Increased complexity is accompanied by an increase in cell types", "Simple animals have more cell types than complex ones"],
        correct: 2,
         explanation: "Increased complexity in animals is strongly associated with a higher number of different cell types (more differentiation), each specialized for specific roles in tissues and organ systems. More complex organisms tend to have a greater variety of cell types working together."
    },
    {
       text: "What conclusion can be drawn about the complexity of animal body plans relative to their functions?",
        options: ["Complex body plans do not allow for complex functions", "More complex body plans do not mean more complex functions.", "Complex body plans are required to perform complex functions", "Animals with simpler body plans have more complex functions"],
        correct: 2,
        explanation: "The complexity of an animal's body plan directly relates to the functions it can perform. More complex tasks require more complex structures, as seen in the evolution of animal systems, indicating a strong correlation between body plan and functional complexity."
    }, 
   {
        text: "What changes occur as the follicle develops into the tertiary stage?",
        options: ["Decrease in the number of cells", "Fluid starts to accumulate", "Cells begin to breakdown", "Fluid disappears gradually"],
        correct: 1,
        explanation: "As the follicle develops into the tertiary stage, one of the significant changes is the accumulation of fluid within the follicle. This fluid forms a cavity called the antrum, characteristic of the tertiary follicle."
    },
   {
        text: "Which stage of the follicle contains an antrum (fluid-filled cavity)?",
        options: ["Primordial follicle", "Secondary follicle", "Tertiary follicle", "Graafian follicle"],
        correct: 2,
        explanation: "The antrum, a fluid-filled cavity, is a defining feature of the tertiary follicle. This cavity develops from the fluid secreted by the follicular cells and plays a role in follicle maturation."
    },
    {
        text: "What happens to the oocyte during the tertiary stage?",
        options: ["It breaks down and dies", "It increases significantly in size", "It is pushed to the edge of the follicle", "It is surrounded by the corona radiata"],
        correct: 2,
        explanation: "During the tertiary stage, as the antrum fills with fluid, the oocyte is pushed to the periphery of the follicle. This is an important step in preparation for ovulation, the process by which the oocyte is released."
    },
     {
        text: "What is another name for the Graafian follicle?",
        options: ["Primary follicle", "Secondary follicle", "Tertiary follicle", "Quartenary follicle"],
        correct: 3,
        explanation: "The Graafian follicle is the mature, pre-ovulatory follicle. It's essentially the final stage of follicular development after the tertiary follicle. It contains a fully mature oocyte and is ready for ovulation."
    },
    {
        text: "What is the immediate fate of the oocyte after ovulation?",
        options: ["It begins its second division immediately.", "It becomes a primary follicle.", "It completes its first meiotic division and produces two unequal cells", "It develops into an embryo"],
        correct: 2,
        explanation: "After ovulation, the oocyte completes its first meiotic division, resulting in two unequal cells: a larger secondary oocyte and a smaller polar body. This division is crucial for preparing the egg for potential fertilization."
    },
     {         text: "What two cells result from the oocyte's first meiotic division?",
        options: ["Two small polar bodies", "One large oocyte and one small polar body", "Two large ova", "One large ovum and one small secondary oocyte"],
        correct: 1,
        explanation: "The first meiotic division of the oocyte results in one large secondary oocyte, which will eventually become the ovum, and one small polar body. The polar body is a non-functional cell that is eventually degraded."
    },
    {
         text: "Which level of organization is characterized by specialized sub-cellular structures (organelles)?",
        options: ["Tissue level", "Protoplasmic level", "Cellular level", "Organ-system level"],
        correct: 1,
        explanation: "The protoplasmic level of organization, typical of unicellular organisms, is defined by the presence of specialized organelles within a single cell. These organelles perform vital functions essential for cell survival and activities."
    },
    {
       text: "Which is an example of cellular organization?",
       options: ["The nerve net of Cnidarians", "The alimentary canal of Homo sapiens", "Sponges and Volvox", "Platyhelminthes"],
       correct: 2,
       explanation: "Sponges and Volvox are examples of cellular-level organization. Their cells are not grouped into true tissues and organs, meaning their cells function primarily independently, although they may form loose aggregations."
    },
    {
         text: "Which level of organization is characterized by aggregations of morphologically and physiologically related cells?",
         options: ["Cellular level", "Protoplasmic level", "Tissue level", "Organ level"],
         correct: 2,
         explanation: "The tissue level of organization is characterized by groups of cells that are morphologically and physiologically similar working together to perform a specific function. This level is more complex than the cellular level where cells act more independently."
    },
   {
        text: "What is the relationship between meiosis and oogenesis?",
        options: ["Meiosis is a stage within oogenesis.", "Oogenesis causes meiosis to occur.", "Meiosis and oogenesis are unrelated.", "Meiosis prevents oogenesis."],
        correct: 0,
        explanation: "Meiosis is a vital part of oogenesis. Oogenesis involves several stages of cell division and differentiation, and meiosis is specifically responsible for reducing the chromosome number in the oocyte to half of its original state so that fertilization results in a normal diploid cell."
    },
    {
        text: "What is the order of follicle development in the ovary?",
        options: ["Tertiary, primordial, secondary, Graafian", "Primordial, tertiary, secondary, Graafian", "Primordial, secondary, tertiary, Graafian", "Graafian, secondary, primordial, tertiary"],
        correct: 2,
        explanation: "The order of follicle development is primordial, secondary, tertiary, and finally Graafian. The primordial follicle is the earliest stage, and the Graafian follicle is the mature, pre-ovulatory stage, with the secondary and tertiary follicles falling in between."
    },
    {
         text: "What is the specific function of the zona pellucida in oogenesis?",
        options: ["To protect the oocyte from external damage", "To provide nourishment to the growing follicle cells", "To facilitate cytoplasmic transfer to the oocyte", "To provide a route for sperm to reach the oocyte"],
        correct: 2,
         explanation: "The zona pellucida, an extracellular matrix surrounding the oocyte, contains proteins that are involved in sperm recognition and binding, thereby playing a key role in the fertilization process. It’s not related to cytoplasmic transfer."
     },
    {
        text: "If an animal's cells are organized into tissues, but it lacks distinct organs, which level of organization is it at?",
        options: ["Protoplasmic", "Cellular", "Tissue grade", "Organ-system level"],
        correct: 2,
        explanation: "An animal that has cells organized into tissues but lacks distinct organs is at the tissue grade level of organization. This level is more complex than a cellular organization, but not as complex as an organ or organ system level."
    },
    {
        text: "What is the immediate outcome of meiosis I during oogenesis?",
       options: ["Two identical primary oocytes", "Two unequal cells, one large oocyte and one polar body", "Four spermatids", "A single mature ovum"],
        correct: 1,
        explanation: "Meiosis I in oogenesis results in two unequal cells: a large secondary oocyte (which is destined to become the ovum after meiosis II and fertilization) and a small polar body (which is generally non-functional). This unequal division ensures that the ovum retains most of the cytoplasm."
    },
    {
         text: "How is the fluid accumulation in the tertiary follicle related to the oocyte's position?",
        options: ["It makes the oocyte to burst out of the follicle", "It pushes the oocyte to the periphery of the follicle", "It has no effect on the oocyte's position", "It pushes the oocyte into the center of the follicle"],
       correct: 1,
        explanation: "The fluid accumulation in the antrum of the tertiary follicle causes the oocyte and the surrounding granulosa cells to be pushed to one side of the follicle, which is a necessary positioning for ovulation. The oocyte does not burst out of the follicle until ovulation."
    },
     {
         text: "What is the primary purpose of the levels of organization in animals?",
       options: ["To allow for more simple forms of organization", "To decrease the efficiency of bodily functions", "To allow for the performance of increasingly complex tasks", "To create variety in different animals"],
         correct: 2,
        explanation: "The primary purpose of increasing levels of organization in animals, from the protoplasmic to the organ-system level, is to enable the performance of more complex and efficient bodily functions, including movement, digestion, and reproduction. Complexity arises from increased specialization of tissues and organs."
    },
     {
        text: "An animal is composed of aggregations of cells. If this animal cannot produce specialized tissues, what level of organization does it represent?",
        options: ["Tissue grade", "Organ level", "Cellular level", "Protoplasmic level"],
       correct: 2,
        explanation: "If an animal is composed of aggregations of cells that are not specialized into tissues, it represents a cellular level of organization. Animals like sponges fit this category, their cells function mostly independently and do not form true tissues."
   }, 
    {
        text: "What is a fundamental challenge faced by all animals?",
        options: ["Developing complex skeletal structures", "Maintaining a constant body temperature", "Obtaining food, oxygen, water, and removing waste", "Developing camouflage mechanisms"],
        correct: 2,
        explanation: "All animals, regardless of their complexity, must acquire essential resources like food, oxygen, and water and effectively remove waste products to survive. These basic metabolic processes are crucial for life."
    },
    {
        text: "Which of the following is NOT a key aspect on which animal body plans differ?",
        options: ["Body symmetry", "Number of body cavities", "Level of consciousness", "Graded organization"],
        correct: 2,
        explanation: "While body symmetry, the presence of body cavities, and the graded organization of complexity are fundamental aspects used to classify and differentiate animal body plans, the 'level of consciousness' is a subjective and complex trait, not a primary structural feature of body plan classification."
    },
    {
        text: "How many major levels of body complexity are recognized in animals?",
        options: ["Three", "Four", "Five", "Six"],
         correct: 2,
        explanation: "There are five recognized levels of body complexity in animals: protoplasmic, cellular, tissue grade, tissue-organ grade, and organ system grade. These levels reflect an increasing degree of structural and functional organization."
     },
    {
        text: "What is the defining characteristic of the protoplasmic level of organization?",
        options: ["Cells are grouped into tissues.", "All life functions are performed within a single cell.", "Multiple cells work together.", "The organism has specialized organs."],
        correct: 1,
        explanation: "The protoplasmic level of organization, characteristic of single-celled organisms, features all life functions, such as nutrition, respiration, and waste removal, occurring within a single cell's cytoplasm and organelles."
    },
    {
        text: "Which of the following best describes 'organelles' in the context of the protoplasmic level?",
        options: ["Simple cell structures", "Specialized structures within a cell", "Structures that form tissues", "Organs of the organism"],
        correct: 1,
       explanation: "Organelles are specialized structures within a cell, such as mitochondria and ribosomes, that carry out specific functions necessary for the cell's survival, growth, and reproduction at the protoplasmic level."
    },
     {
        text: "Metazoans are synonymous with what type of animals?",
        options: ["Protoplasmic animals", "Unicellular animals", "Multicellular animals", "Organ-system level animals"],
        correct: 2,
        explanation: "The term 'metazoan' refers to all multicellular animals. This contrasts with unicellular organisms, like protozoans, that exhibit a protoplasmic level of organization."
    },
    {
        text: "What is characteristic of primitive metazoans like Volvox and Sponges?",
        options: ["They have specialized tissues and organs", "They are well organized to carry out complex collective functions", "Their cells function together to form specialized organs", "They exhibit aggregations of cells that are not closely associated for collective function."],
        correct: 3,
        explanation: "Primitive metazoans like Volvox and sponges demonstrate a cellular level of organization. Their cells are aggregated, but they are not as interdependent or organized into specialized tissues and organs as more complex animals."
    },
    {
        text: "Which level of organization do tissues represent?",
        options: ["Protoplasmic", "Cellular", "Tissue grade", "Organ system"],
        correct: 2,
         explanation: "Tissues represent the 'tissue grade' level of organization. In this level, cells with similar structures and functions are grouped together to perform a specific function, which is more complex than simply individual cells functioning separately."
    },
    {
        text: "What kind of animals have a 'nerve net' as an example of the tissue-grade level of organization?",
        options: ["Sponges", "Platyhelminthes", "Cnidarians", "Humans"],
       correct: 2,
       explanation: "Cnidarians, such as jellyfish and hydra, possess a 'nerve net,' a diffuse network of nerve cells that helps coordinate responses to stimuli but does not form a centralized nervous system, representing a tissue-grade level of organization."
    },
    {
        text: "Which animals are considered to be at the tissue-organ grade of organization?",
         options: ["Volvox", "Cnidarians", "Platyhelminthes", "Sponges"],
        correct: 2,
         explanation: "Platyhelminthes, such as flatworms, display the tissue-organ grade of organization. They have tissues organized into simple organs such as a digestive cavity, but not all organ systems are fully formed, distinguishing them from the more complex organ system grade."
    },
    {
        text: "What is the highest level of organization mentioned?",
        options: ["Tissue", "Organ", "Organ system", "Cellular"],
        correct: 2,
         explanation: "The organ system level represents the highest degree of organization, where multiple organs work together to carry out complex functions.  This is more complex than individual tissues or organs working in isolation."
    },
    {
       text: "Which example is used to exemplify the organ system?",
        options: ["The nerve net of Cnidarians", "The alimentary canal of Homo sapiens", "The aggregation of cells in Volvox", "The specialised cells of Platyhelminthes"],
        correct: 1,
        explanation: "The alimentary canal (digestive system) of *Homo sapiens* is a good example of an organ system because it consists of multiple organs (mouth, stomach, intestines, etc.) working together to perform the complex task of digesting food and absorbing nutrients."
   },
    {
        text: "What process is responsible for the production of eggs?",
         options: ["Spermatogenesis", "Oogenesis", "Fertilization", "Embryogenesis"],
         correct: 1,
         explanation: "Oogenesis is the specific process of female gamete (egg) production. Spermatogenesis is the equivalent process for sperm production in males. Fertilization is the union of gametes, and embryogenesis refers to the development of the embryo."
    },
    {
         text: "When does the development of ovaries begin in females?",
         options: ["At puberty", "At the time of birth", "Early in fetal life", "During the menstrual cycle"],
         correct: 2,
         explanation: "The development of ovaries and the process of oogenesis starts very early in fetal life. Primordial follicles begin to form, and primary oocytes are produced before birth, demonstrating how early the reproductive system begins developing."
    },
    {
        text: "What stage is the primary oocyte arrested in until puberty?",
        options: ["Mitosis", "Meiosis II", "Metaphase II", "Meiosis I"],
        correct: 3,
        explanation: "Primary oocytes are arrested in prophase I of meiosis I until puberty. This pause ensures that the oocytes remain in a stable state until hormonal cues trigger further development during the female's reproductive years."
    },
    {
         text: "What causes primordial follicles to resume their mitotic division at puberty?",
         options: ["Increased estrogen levels", "Decreased progesterone levels", "Hormonal influences", "Changes in body temperature"],
         correct: 2,
         explanation: "At puberty, hormonal changes, including increased levels of follicle-stimulating hormone (FSH) and luteinizing hormone (LH), trigger the resumption of oocyte development. These hormonal influences are crucial for the maturation of the female reproductive system."
    },
    {
        text: "What is the name of the structure formed as a result of the mitotic division of follicular cells?",
        options: ["Primary follicle", "Secondary follicle", "Tertiary follicle", "Graafian follicle"],
        correct: 1,
         explanation: "As follicular cells around the oocyte divide mitotically, they form a multi-layered structure called the secondary follicle. This follicle development occurs after the primordial follicle stage and is an important step in oocyte maturation."
    },
   {
        text: "What is the name of the amorphous substance between the follicular cells and the oocyte?",
        options: ["Corona Radiata", "Zona Pellucida", "Tertiary fluid", "Granulosa"],
        correct: 1,
        explanation: "The zona pellucida is a thick, translucent extracellular matrix that surrounds the oocyte. It plays a vital role in sperm binding during fertilization and is situated between the oocyte and surrounding follicular cells."
    },
    {
         text: "What is the layer of cells around the zona pellucida called?",
         options: ["Primordial follicle", "Corona radiata", "Secondary oocyte", "Tertiary follicle"],
        correct: 1,
        explanation: "The corona radiata is a layer of granulosa cells that surrounds the zona pellucida. These cells provide nourishment to the oocyte, and they are an important structure for the oocyte's journey through the oviduct."
    }, 
  {
        text: "What is the fate of the second cell resulting from the first meiotic division during oogenesis?",
        options: ["It becomes a secondary oocyte.", "It develops into a polar body.", "It is immediately fertilized.", "It forms a zygote."],
        correct: 1,
        explanation: "The first meiotic division during oogenesis results in two cells: a larger secondary oocyte and a smaller cell called the first polar body. The polar body is a non-functional cell that is eventually degraded."
    },
    {
        text: "What characterizes a polar body?",
        options: ["A large amount of cytoplasm.", "The ability to become a new egg cell.", "No cytoplasm.", "The ability to develop into a new embryo."],
        correct: 2,
        explanation: "A polar body is characterized by having very little cytoplasm compared to the oocyte. It essentially serves as a means to discard extra chromosomes, ensuring the oocyte has the correct number of chromosomes for fertilization."
    },
    {
        text: "Where is the polar body located in relation to the oocyte after the first meiotic division?",
        options: ["Inside the oocyte.", "Lying between the oocyte and zona pellucida", "Attached to the outside of the oocyte", "Embedded in the cumulus oophorus"],
        correct: 1,
        explanation: "After the first meiotic division, the polar body is found lying between the oocyte and the zona pellucida. It's a small, non-functional cell that does not participate directly in fertilization or development."
    },
   {
        text: "What structures are released during ovulation?",
        options: ["Only the oocyte.", "Only the oocyte and the polar body", "The oocyte, corona radiata, and cumulus oophorus.", "The oocyte, zona pellucida and the polar body."],
        correct: 2,
        explanation: "During ovulation, the oocyte is released from the ovary along with the surrounding corona radiata (layer of cells) and the cumulus oophorus (the cloud of follicular cells), forming a complex that will be captured by the fimbriae of the fallopian tube. The zona pellucida remains closely associated with the oocyte."
    },
   {
        text: "What is the name given to the cloud of follicular cells that surrounds the oocyte during ovulation?",
        options: ["Corona radiata", "Zona pellucida", "Polar body", "Cumulus oophorus"],
        correct: 3,
        explanation: "The cumulus oophorus is the mass of follicular cells that surrounds the oocyte and the corona radiata at the time of ovulation, playing a role in guiding the oocyte into the fallopian tube."
    },
   {
        text: "At which stage of meiosis is the oocyte arrested following ovulation?",
         options: ["Metaphase I", "Prophase II", "Metaphase II", "Anaphase II"],
        correct: 2,
        explanation: "Following ovulation, the oocyte is arrested at Metaphase II of meiosis. This means it is still undergoing division but is paused until fertilization, where the second meiotic division is completed."
    },
   {
        text: "What triggers the completion of the second meiotic division of the oocyte?",
        options: ["Ovulation", "Fertilization", "Entry into the uterus", "Contact with a polar body"],
        correct: 1,
        explanation: "The second meiotic division of the oocyte is completed *only* after fertilization occurs. This is when the sperm penetrates the oocyte, triggering the oocyte to finish meiosis II and become a mature ovum."
    },
    {
         text: "What type of cell division is characteristic of cleavage?",
         options: ["Meiosis", "Mitosis", "Amitosis", "Binary fission"],
        correct: 1,
        explanation: "Cleavage is characterized by a series of rapid mitotic divisions. Unlike meiosis, mitosis during cleavage produces identical copies of the zygote's cells, increasing the number of cells without increasing the overall size of the embryo."
    },
    {
        text: "What is the primary outcome of cleavage?",
        options: ["An increase in cell size.", "The formation of specialized cells.", "The rapid increase in cell number.", "The development of the zygote into an embryo."],
       correct: 2,
        explanation: "The primary outcome of cleavage is a rapid increase in cell number. These numerous smaller cells are called blastomeres and result from a series of quick mitotic divisions without significant cell growth."
    },
    {
        text: "What is holoblastic cleavage characterized by?",
        options: ["Incomplete cleavage furrows.", "Complete cell division in each cleavage.", "Cells with unequal size.", "Limited cytoplasmic division"],
        correct: 1,
        explanation: "Holoblastic cleavage is characterized by complete cell division at each cleavage. This occurs in eggs with relatively little yolk and results in each cleavage furrow passing entirely through the zygote."
    },
    {
        text: "What is meroblastic cleavage characterized by?",
        options: ["Complete cell division in each cleavage.", "Partial or incomplete cleavage furrows.", "Cells with equal size.", "Cytoplasmic division of the whole egg."],
        correct: 1,
       explanation: "Meroblastic cleavage is characterized by incomplete cleavage furrows. The large amount of yolk inhibits the complete division of the cell, so only parts of the cytoplasm are divided. This is typically seen in eggs with lots of yolk."
   },
    {
        text: "In the context of development, what is a blastula?",
        options: ["A single-celled zygote.", "A structure with a fluid-filled cavity (blastocoel) and surrounding cells", "The primary germ layer of the embryo.", "A mass of yolk cells."],
        correct: 1,
        explanation: "In early development, a blastula is a hollow sphere or ball of cells surrounding a fluid-filled cavity called the blastocoel. It develops after cleavage of the zygote, and forms the stage preceding gastrulation."
    },
    {
        text: "What structure is formed after the cleavage stage in early development?",
        options: ["Zygote", "Gastrula", "Blastula", "Morula"],
        correct: 2,
        explanation: "Following the cleavage stage, the structure formed is the blastula. Cleavage divides the zygote into many smaller cells, which then form the blastula stage."
    },
   {
        text: "What is the fluid-filled cavity within the blastula called?",
        options: ["Archenteron", "Blastopore", "Blastocoel", "Yolk sac"],
        correct: 2,
        explanation: "The blastocoel is the fluid-filled cavity inside the blastula. It plays an important role in the early stages of development before gastrulation."
    },
     {
        text: "What event occurs after the blastula stage?",
        options: ["Cleavage", "Gastrulation", "Fertilization", "Ovulation"],
        correct: 1,
        explanation: "After the blastula stage in early embryonic development, gastrulation occurs. During gastrulation, the three germ layers (ectoderm, mesoderm, and endoderm) are formed, setting the stage for organogenesis."
    },
    {
        text: "What is meant by radial cleavage?",
        options: ["Cleavage that occurs in a spiral pattern.", "Cleavage where divisions occur parallel and perpendicular to the original axis.", "Cleavage that results in unequal-sized cells.", "Cleavage only in deuterostomes."],
        correct: 1,
       explanation: "Radial cleavage is characterized by divisions that occur in parallel and perpendicular planes to the original axis of the egg, forming cells directly on top of each other. This differs from spiral cleavage in which cells are offset from one another."
    },
    {
        text: "What type of animal exhibits radial cleavage during development?",
       options: ["Protostomes", "Echinoderms", "Molluscs", "Annelids"],
        correct: 1,
       explanation: "Radial cleavage is commonly observed during the development of deuterostomes, such as echinoderms (starfish, sea urchins). It is a characteristic feature that distinguishes them from protostomes."
    },
    {
       text: "How does cell removal during early radial cleavage affect development?",
        options: ["It always prevents normal development.", "It prevents normal development in all organisms.", "It can prevent normal development in determinate species, but not in non-determinate species.", "It promotes normal development in determinate species."],
        correct: 2,
       explanation: "Cell removal in early development can have different effects depending on whether the organism's cells are determinate (fate is fixed) or indeterminate (fate is flexible). In determinate species, cell removal usually prevents normal development, whereas in indeterminate species, the remaining cells can compensate."
    },
    {
        text: "What is a characteristic of cell division during radial cleavage?",
        options: ["It always yields cells of unequal size.", "It always yields cells of the same size.", "It can yield cells of unequal or the same size.", "It only happens during gastrulation."],
        correct: 2,
        explanation: "Cell division during radial cleavage can result in cells of equal or unequal size, depending on the specific organism and its egg's yolk distribution. Cleavage in general occurs before gastrulation, so it does not happen only during gastrulation."
    }, 
    {
        text: "What is the role of the yolk within the ovum?",
        options: ["It protects the genetic material", "It serves as a source of nutrition for the developing embryo", "It facilitates fertilization", "It provides the oocyte with cell signaling molecules."],
         correct: 1,
        explanation: "The primary role of the yolk in the ovum is to provide nutrients for the developing embryo. These nutrients support the early growth and development of the embryo before it can obtain nourishment on its own."
    },
    {
        text: "What is meant by the term 'telolecithal' in relation to eggs?",
         options: ["Eggs with a small amount of yolk.", "Eggs with an evenly distributed yolk.", "Eggs with the yolk concentrated at one pole.", "Eggs lacking a yolk."],
        correct: 2,
         explanation: "Telolecithal eggs are characterized by a concentration of yolk at one pole, known as the vegetal pole. This distribution of yolk has a profound influence on cleavage patterns during early development."
    },
    {
        text: "Which part of a telolecithal egg is characterized by the nucleus and relatively less yolk?",
         options: ["Vegetal pole", "Animal pole", "Blastocoel", "Blastopore"],
         correct: 1,
        explanation: "The animal pole of a telolecithal egg contains the nucleus and has relatively less yolk compared to the vegetal pole. It’s the site where cell division typically begins during cleavage."
    },
    {
        text: "Which part of a telolecithal egg has a larger concentration of yolk?",
        options: ["Animal pole", "Vegetal pole", "Blastocoel", "Cumulus oophorus"],
        correct: 1,
        explanation: "The vegetal pole of a telolecithal egg has a larger concentration of yolk. The yolk serves as a nutrient source for the developing embryo, and its distribution affects cell size and cleavage."
    },
    {
        text: "What type of cleavage is characteristic of a moderately telolecithal egg like that of a frog?",
        options: ["Meroblastic", "Holoblastic", "Radial", "Spiral"],
        correct: 1,
         explanation: "Moderately telolecithal eggs, like those of frogs, undergo holoblastic cleavage. Though there’s yolk concentrated in the vegetal pole, cleavage is still complete in each cell division. However, these cells tend to be unequal in size as the vegetal cells divide slower due to the yolk."
    },
    {

         text: "What type of cleavage is associated with heavy telolecithal eggs of fish, reptiles, and birds?",
        options: ["Holoblastic", "Microlecithal", "Meroblastic", "Radial"],
        correct: 2,
        explanation: "Heavy telolecithal eggs, such as those of fish, reptiles, and birds, exhibit meroblastic cleavage. The large amount of yolk impedes cell division and only a partial division of the cytoplasm takes place."
    },
    {
        text: "What characterizes a microlecithal egg?",
        options: ["A large amount of yolk evenly distributed", "A very small amount of yolk.", "A very large amount of yolk confined to one pole.", "A moderate amount of yolk confined to one pole."],
        correct: 1,
        explanation: "A microlecithal egg is characterized by a very small amount of yolk. These eggs rely on placental nutrition for development, and their cells divide equally during cleavage."
    },
    {
        text: "Which is an example of an animal with microlecithal eggs?",
        options: ["A bird", "A fish", "A reptile", "A eutherian mammal"],
        correct: 3,
         explanation: "Eutherian mammals (placental mammals) are an example of animals that have microlecithal eggs. Their eggs have very little yolk and rely on the placenta for nutrient supply during development."
    },
    {
        text: "What is the impact of uneven yolk distribution on the cleavage pattern?",
        options: ["It makes cleavage faster", "It has no impact", "It causes cleavage to be uniform", "It causes cleavage to be unequal"],
         correct: 3,
        explanation: "Uneven yolk distribution, such as in telolecithal eggs, can lead to unequal cleavage. This means that the cells in different parts of the egg will divide at different rates and end up with different sizes."
    },
    {
       text: "What structure results from the repeated division of a fertilized egg in microlecithal eggs?",
       options: ["Morula", "Blastodisc", "Blastula", "Gastrula"],
       correct: 1,
        explanation: "In microlecithal eggs, the repeated divisions form a structure called the blastodisc (a flat disk of cells), rather than the blastula stage found in eggs with more yolk. The yolk has a minimal effect on cleavage, leading to a blastodisc."
    },
     {
        text: "In eggs with a large amount of yolk, where is the cytoplasmic blastodisc usually located?",
        options: ["In the center of the yolk.", "In the vegetal pole.", "In a small cap at the animal pole.", "In the blastocoel."],
        correct: 2,
        explanation: "In eggs with a large amount of yolk, such as in birds and reptiles, the blastodisc is typically located in a small cap at the animal pole. The large yolk mass limits the cytoplasm to this region where the blastodisc forms."
     },
    {
       text: "The presence of a polar body suggests that which process has recently occurred?",
        options: ["Meiosis I", "Meiosis II", "Mitosis", "Fertilization"],
       correct: 0,
        explanation: "The presence of a polar body indicates that Meiosis I has occurred. The first meiotic division is asymmetrical, creating the secondary oocyte and a small polar body."
    },
    {
         text: "If the oocyte is at metaphase II, what process is required to complete its division?",
        options: ["Ovulation", "Meiosis I", "Fertilization", "Gastrulation"],
        correct: 2,
        explanation: "If the oocyte is arrested at metaphase II, fertilization is required to complete its division. The entry of the sperm triggers the oocyte to finish meiosis II and become a mature ovum."
    },
    {
         text: "If cleavage proceeds holoblastically, what would be a correct conclusion?",
        options: ["It has a large amount of yolk concentrated in one pole", "It has partial cell division", "The egg has a relatively small amount of yolk", "The cell undergoes incomplete cytoplasmic division"],
        correct: 2,
        explanation: "If cleavage is holoblastic, it indicates that the egg has a relatively small amount of yolk. This allows the cell to divide completely during cleavage without the yolk interfering. Eggs with more yolk, undergo meroblastic cleavage."
    },
    {
        text: "What is the relationship between the amount of yolk in an egg and the type of cleavage it exhibits?",
        options: ["They are independent of each other", "Eggs with more yolk always have holoblastic cleavage", "Eggs with less yolk always have meroblastic cleavage", "Yolk content often influences the pattern of cleavage"],
        correct: 3,
         explanation: "The amount of yolk in an egg is a key factor that influences the pattern of cleavage. Eggs with less yolk tend to exhibit holoblastic cleavage, while eggs with more yolk tend to exhibit meroblastic cleavage."
    },
   {
         text: "If an embryo forms a blastocoel during development, what is a reasonable inference?",
         options: ["The embryo is undergoing radial cleavage", "The embryo is undergoing meroblastic cleavage", "The embryo has reached the blastula stage", "The embryo has reached the gastrula stage"],
       correct: 2,
         explanation: "The presence of a blastocoel, a fluid-filled cavity within a hollow sphere of cells, is a clear indicator that the embryo has reached the blastula stage, which is a key stage before gastrulation."
    }, 
    {
        text: "What can be concluded from a species whose fertilized egg divides to form a mass of blastomeres with different sizes and the cleavage is incomplete?",
        options: ["It has a microlecithal egg", "It has a holoblastic cleavage pattern", "It has a meroblastic cleavage pattern", "It has a very small blastocoel"],
        correct: 2,
        explanation: "If a fertilized egg divides to form a mass of blastomeres with different sizes and the cleavage is incomplete, this suggests the egg has a large amount of yolk that hinders full division. This type of cleavage is called meroblastic cleavage, where the division is only partial due to the presence of a large yolk mass. Microlecithal eggs will not exhibit this pattern, and holoblastic cleavage indicates a complete division."
    }, 
   {
        text: "A mutation in the cumulus oophorus would directly affect what process?",
        options: ["Ovulation", "Fertilization", "Meiosis II", "Cleavage"],
        correct: 0,
        explanation: "A mutation in the cumulus oophorus would directly affect ovulation. The cumulus oophorus helps guide the oocyte into the fallopian tube, and any malfunction will hinder the process of ovulation."
    },
    {
         text: "If the egg exhibits holoblastic cleavage, but the blastomeres end up being of different sizes, what is likely the cause?",
        options: ["An error in meiosis.", "Radial cleavage.", "Uneven distribution of yolk.", "Lack of a zona pellucida."],
        correct: 2,
        explanation: "If holoblastic cleavage results in blastomeres of different sizes, the likely cause is an uneven distribution of yolk. Although the cleavage is complete, the yolk impedes cell division in the yolky pole, causing different sizes."
    },
    {
         text: "An egg cell has its cleavage furrows inhibited in the yolky part of the egg. What type of cleavage is this?",
        options: ["Holoblastic", "Meroblastic", "Radial", "Spiral"],
        correct: 1,
        explanation: "If the cleavage furrows are inhibited in the yolky part of the egg, this indicates meroblastic cleavage. The large amount of yolk in meroblastic eggs limits cytoplasmic division during cleavage."
    },
    {
        text: "In a hypothetical situation, a drug inhibits the formation of the blastocoel. What effect will this have?",
         options: ["Cleavage will be prevented", "Gastrulation will be impaired", "The number of blastomeres will be reduced", "Fertilization will not occur"],
        correct: 1,
        explanation: "If a drug inhibits the formation of the blastocoel, gastrulation will be impaired. The blastocoel is crucial for providing space for cell movements during gastrulation."
    },
    {
       text: "An animal has microlecithal eggs, what does this imply about its life style?",
        options: ["It needs more yolk to allow for development outside the mother", "It needs an extensive period of development inside the mother", "It needs a less extensive period of development inside the mother", "Its offspring do not require parental care"],
        correct: 1,
        explanation: "Animals with microlecithal eggs, which have very little yolk, typically require an extensive period of development inside the mother. This is because they rely on the mother for nutrients during the development process through a placenta, rather than relying on the egg's yolk."
    },
     {
        text: "If the polar body is located outside the zona pellucida, what does this suggest about its function?",
        options: ["It has a role in providing nutrition to the oocyte.", "It is a developmental cell with high importance.", "It is a cell without further developmental purpose", "It has a role in fertilization."],
        correct: 2,
        explanation: "If the polar body is located outside the zona pellucida, it suggests that it's a cell without a further developmental purpose. Polar bodies are essentially a way for the oocyte to discard unneeded chromosomes and cytoplasm, therefore are eventually degraded."
    },
    {
         text: "A researcher observes radial cleavage in a developing embryo. What is the most likely conclusion they can make about the organism's phylogeny?",
         options: ["It is likely to be a protostome", "It is likely to be a mollusc", "It is likely to be a deuterostome", "It is likely to be a nematoda"],
        correct: 2,
        explanation: "If a researcher observes radial cleavage in a developing embryo, the most likely conclusion is that the organism is a deuterostome. Radial cleavage is a characteristic feature of deuterostomes, which include echinoderms and chordates. Protosomes include molluscs and nematodes and follow spiral cleavage."
    },
    {
         text: "If an egg has a large amount of yolk and the cleavage furrows are incomplete, what can you conclude about its likely developmental pattern?",
        options: ["It will have equal blastomeres", "It will have holoblastic cleavage", "It will have meroblastic cleavage", "It will have no cytoplasmic division"],
        correct: 2,
        explanation: "If an egg has a large amount of yolk and the cleavage furrows are incomplete, you can conclude that it will have meroblastic cleavage. The presence of significant yolk interferes with cytoplasmic division."
    },
     {
        text: "If a species has very small microlecithal eggs, what can you conclude about its early development?",
        options: ["The developing embryo is independent and does not need yolk", "The developing embryo requires external nutrients", "The developing embryo has small nutritional requirements", "The developing embryo will be able to survive outside the mother"],
       correct: 1,
        explanation: "If a species has very small microlecithal eggs, you can conclude that its early development requires external nutrients. Microlecithal eggs have minimal yolk, so development requires access to nutrients from another source, such as the mother through a placenta."
    },
    {
         text: "If a species has a heavy telolecithal egg, what can you conclude about its cleavage pattern?",
        options: ["It will have holoblastic cleavage", "It will have radial cleavage", "It will have meroblastic cleavage", "It will have spiral cleavage"],
        correct: 2,
        explanation: "If a species has a heavy telolecithal egg (a large amount of yolk at one pole), you can conclude that its cleavage pattern will be meroblastic. The significant amount of yolk impedes complete cell division."
    },
    {
         text: "How does the arrangement of blastomeres in the eight-cell stage differ between radial and other types of cleavage?",
        options: ["Blastomeeres in the eight-cell stage are the same size in all cleavages.", "Blastomeeres in the eight-cell stage are arranged radially in radial cleavage", "Blastomeeres in the eight-cell stage are arranged spirally in radial cleavage", "Blastomeeres in the eight-cell stage have different sizes in radial cleavage"],
       correct: 1,
        explanation: "During radial cleavage, the blastomeres in the eight-cell stage are arranged radially, meaning they are directly on top of one another. This contrasts with spiral cleavage where cells are offset."
   },
   {
        text: "How does the presence of a large blastocoel in a blastula relate to the developmental strategy of an animal?",
        options: ["A larger blastocoel means a slower rate of development.", "A larger blastocoel provides a larger space for gastrulation.", "A larger blastocoel means a faster rate of cell division.", "The presence of the blastocoel is independent of the animal's development"],
       correct: 1,
        explanation: "A larger blastocoel in a blastula provides a larger space for the cell movements that occur during gastrulation, suggesting an important role for cell migration within this space during the development of the organism."
    },
    {
         text: "What is the functional relationship between the cytoplasm and yolk in eggs?",
        options: ["Yolk is independent of the cytoplasm", "Cytoplasm stores the yolk", "Yolk is part of the cytoplasm", "Yolk and cytoplasm are not related in any way"],
        correct: 2,
         explanation: "The yolk is an integral part of the cytoplasm in eggs. The yolk is not independent from the cytoplasm but rather a component that stores nutrients within the cytoplasm of the ovum."
    },  
  ],
  "ZOO101-2": [
    
  {
    text: "Which taxonomic rank is the most inclusive within the animal kingdom?",
    options: ["Family", "Genus", "Species", "Kingdom"],
    correct: 3,
    explanation: "The Kingdom is the most inclusive (broadest) taxonomic rank in the biological classification system. It is the highest level and contains all the different phyla within it."
  },
  {
    text: "If two organisms share the same family but have different genera, what can you infer about their relationship?",
    options: ["They are in the same species.", "They are in the same order.", "They are in different classes.", "They are distantly related."],
    correct: 1,
    explanation: "If two organisms are in the same family, they must also be in the same order. Families are more specific than orders. They must also be in the same class, phylum and kingdom. Genera are within families, therefore they are not in the same genus."
  },
   {
        text: "What is the defining characteristic of a species within the taxonomic hierarchy?",
        options: ["Members of a species have identical characteristics.", "They occupy similar habitats", "Members can reproduce with each other", "They are very similar in morphology"],
         correct: 2,
        explanation: "The defining characteristic of a species is that its members can interbreed and produce viable, fertile offspring. While species members often share similar characteristics, this is not the primary defining criterion."
    },
  {
    text: "A class is composed of multiple:",
    options: ["Orders", "Genera", "Species", "Families"],
    correct: 0,
    explanation: "A Class is a broad group which consists of multiple related Orders. The hierarchical structure of taxonomy means that class is within phylum and order is within class."
  },
    {
        text: "Why is a phylum considered a higher taxonomic grouping than a class?",
        options: ["Because it contains fewer species", "Because it groups animals with broader shared traits", "Because it groups animals with highly specific traits", "Because it includes fewer organisms"],
        correct: 1,
        explanation: "A phylum is a higher and more inclusive rank than a class. A phylum encompasses animals that share a more general set of common characteristics, while classes are more specific groupings of animals within that phylum."
    },
  {
    text: "What is a correct relationship between the terms?",

    options: ["Kingdom is within the Phylum", "Family is within Order", "Species is within Genus", "Genus is within Family"],
    correct: 3,
    explanation: "The correct relationship is that a Genus is within a Family. All the other answers are incorrect. The taxonomic order is Kingdom, Phylum, Class, Order, Family, Genus, and Species. Therefore the correct relationship has to follow this order."
  },
  {
    text: "What is the primary distinction between vertebrates and invertebrates?",
    options: ["The type of cells that they have", "The presence or absence of a backbone", "The size of organisms", "The habitats they occupy"],
     correct: 1,
    explanation: "Vertebrates are characterized by the presence of a backbone (spinal column), while invertebrates lack a backbone. This is the most significant difference in classifying animals into these two groups."
  },
    {
       text: "Triploblastic animals are characterized by:",
        options: ["Having 2 embryonic layers.", "Having only ectoderm", "Having three embryonic layers", "The presence of mesoglea"],
        correct: 2,
       explanation: "Triploblastic animals are characterized by having three embryonic tissue layers: the ectoderm, mesoderm, and endoderm."
    },
    {
       text: "What does the term mesoglea refer to?",
      options: ["The fluid-filled cavity of a coelom", "The outermost embryonic layer", "A jelly-like layer found in diploblastic organisms", "The inner layer of a triploblastic animal"],
       correct: 2,
       explanation: "Mesoglea is a jelly-like, non-cellular substance found in diploblastic organisms. It is located between the ectoderm and endoderm layers and gives structure and support to the organism."
    },
     {
        text: "Which phylum represents a group of animals that possess a unique structure called mesoglea?",
        options: ["Annelida", "Arthropoda", "Cnidaria", "Platyhelminthes"],
        correct: 2,
        explanation: "Cnidarians, such as jellyfish, corals, and sea anemones, are diploblastic animals characterized by the presence of mesoglea between their ectoderm and endoderm."
    },
 {
        text: "A key characteristic of diploblastic animals is that they lack:",
        options: ["an ectoderm layer.", "a mesoderm layer.", "a coelom", "endoderm"],
         correct: 1,
        explanation: "Diploblastic animals have only two embryonic layers, the ectoderm and endoderm and lack a mesoderm layer. The mesoglea is the structure between the two layers."
    },
  {
    text: "A true coelom is characterized by:",
    options: ["being a fluid-filled body cavity lined with endoderm", "being a fluid-filled body cavity lined with mesoderm", "lacking a body cavity entirely", "having a body cavity filled with mesoglea"],
    correct: 1,
    explanation: "A true coelom is a fluid-filled body cavity that is completely lined with tissue derived from the mesoderm. This lining provides cushioning, flexibility and space for organ development."
  },
    {
        text: "How is a pseudocoelom distinguished from a true coelom?",
        options: ["It lacks a body cavity completely", "It's only partially lined with mesoderm", "It is completely lined with mesoderm", "It is completely lined with endoderm."],
         correct: 1,
        explanation: "A pseudocoelom is a body cavity that is only partially lined with mesoderm. In contrast, a true coelom is fully lined by mesodermal tissue, and acoelomates lack a body cavity."
    },
  {
    text: "Which phylum contains acoelomate animals?",
    options: ["Arthropoda", "Nematoda", "Platyhelminthes", "Echinodermata"],
    correct: 2,
    explanation: "Platyhelminthes, which includes flatworms, are acoelomate animals. Acoelomates lack a body cavity entirely. Arthropoda, Nematoda and Echinodermata are coelomate or pseudocoelomate animals"
  },
  {
    text: "Which term describes the kind of symmetry in which body parts are arranged around a central axis?",
    options: ["Bilateral", "Biradial", "Asymmetrical", "Radial"],
    correct: 3,
    explanation: "Radial symmetry describes the arrangement of body parts around a central axis, like spokes on a wheel, this can be seen in Cnidarians. Bilateral symmetry, in contrast, has a left and right side. Asymmetrical animals have no symmetry."
  },
    {
        text: "What characterizes a biradial symmetry?",
        options: ["Animals with no symmetry", "A modification of radial symmetry with mirror images", "Only 1 line of symmetry", "Having two halves of an organism"],
         correct: 1,
        explanation: "Biradial symmetry is a modified form of radial symmetry where there is a single line of symmetry. This results in mirror images on either side of one of the axes, but not all axes."
    },
   {
        text: "Animals with radial symmetry lack:",
        options: ["An oral end", "An aboral end", "Anterior or posterior ends", "A central axis"],
        correct: 2,
        explanation: "Radially symmetrical animals do not have distinct anterior (front) or posterior (back) ends. Instead, they have an oral end (where the mouth is) and an aboral end (opposite the mouth)."
    },
    {
        text: "The mouth of a radially symmetrical animal is considered the:",
         options: ["Anterior end", "Posterior end", "Oral end", "Aboral end"],
        correct: 2,
        explanation: "The mouth of a radially symmetrical animal is considered the oral end. This is because of their interaction with the environment from the direction of the mouth. They do not have an anterior or posterior."
    },
     {
        text: "An animal is discovered with a mesoderm, and a fluid filled cavity completely lined with mesoderm. What category would it belong to?",
        options: ["Diploblastic and acoelomate", "Triploblastic and pseudocoelomate", "Triploblastic and coelomate", "Triploblastic and acoelomate"],
         correct: 2,
         explanation: "An animal with a mesoderm is triploblastic. A fluid-filled cavity completely lined with mesoderm defines a true coelomate. So, the organism would be a triploblastic coelomate. A pseudocoelom is partially lined with mesoderm. Acoelomates do not have a body cavity."
    },
 {
        text: "An organism displays radial symmetry with distinct oral and aboral ends. Which phylum would it most likely belong to?",
        options: ["Platyhelminthes", "Annelida", "Cnidaria", "Arthropoda"],
        correct: 2,
        explanation: "Cnidaria, which includes jellyfish and sea anemones, is characterized by radial symmetry and have oral and aboral ends. Platyhelminthes, Annelida and Arthropoda display bilateral symmetry."
    }, 
  {
    text: "What is a key characteristic you would use to separate members of the phylum Nematoda from Platyhelminthes?",
    options: ["The presence of a coelom", "The number of embryonic layers", "The presence of a pseudocoelom", "Type of symmetry"],
    correct: 2,
    explanation: "Nematodes possess a pseudocoelom (a body cavity that isn't fully lined with mesoderm), while Platyhelminthes are acoelomates (lacking a body cavity). Both are triploblastic and bilaterally symmetrical."
  },
  {
    text: "How does being a coelomate offer a potential advantage?",
    options: ["It allows for the development of more rigid body plans", "It provides space for complex organ systems", "It increases the speed at which animals can swim", "It has no real advantage."],
    correct: 1,
    explanation: "A coelom (true body cavity) provides space for the development of complex organ systems, allowing for greater specialization and efficiency.  This allows for more efficient movement, feeding and reproduction."
  },
  {
    text: "What does the classification of animals based on embryonic layers (triploblastic vs. diploblastic) suggest about their evolutionary history?",
    options: ["That it is a random trait.", "It shows they are all similar", "That they have a common ancestor", "That there are different levels of complexity of body organization"],
    correct: 3,
    explanation: "The presence of different embryonic layers (two in diploblastic, three in triploblastic) strongly suggests a common ancestor and a progression of developmental complexity over evolutionary time.  Diploblastic animals are simpler in body plan than triploblastic animals."
  },
  {
    text: "Why might the terms 'anterior' and 'posterior' be less applicable to animals with radial symmetry?",
    options: ["They have a clear anterior and posterior end", "They lack a defined head and tail", "They are used for the oral and aboral ends.", "They are also biradially symmetrical."],
    correct: 1,
    explanation: "Animals with radial symmetry lack a distinct head and tail (anterior and posterior ends). Their body plan is organized around a central axis, making anterior/posterior designations less meaningful."
  },
  {
    text: "If a new animal group is found to have a coelom lined with both mesoderm and endoderm, what would it imply about the current classification of coeloms?",
    options: ["It will confirm the coelom classification", "It will require adjustments of the coelom classification", "It won't change anything", "It will imply that it is an acoelomate."],
    correct: 1,
    explanation: "The current understanding of coeloms is that they are lined primarily with mesoderm.  A coelom lined with both mesoderm and endoderm would challenge this understanding, necessitating revisions to the classification system."
  },
  {
    text: "If an animal was found to have both radial and bilateral symmetry, what would be the most logical way to classify it using current knowledge?",
    options: ["It would need to be in a new group", "It will only be considered bilaterally symmetrical", "It will only be considered radially symmetrical", "We would use their primary mode of symmetry."],
    correct: 0,
    explanation: "Such an animal would defy current classifications as these are mutually exclusive body plans. It would necessitate the creation of a new taxonomic category to accommodate this unusual combination of symmetries."
  },
  {
    text: "If you were to discover an animal that had no mesoderm, which of the currently described groups would be most similar?",
    options: ["A triploblastic coelomate", "A triploblastic pseudocoelomate", "A diploblastic animal", "A bilaterally symmetrical animal"],
    correct: 2,
    explanation: "The absence of a mesoderm is a defining feature of diploblastic animals. Triploblastic animals, by definition, possess a mesoderm."
  },
  {
    text: "If the number of known vertebrate species suddenly increased tenfold, how would this affect our understanding of animal diversity?",
    options: ["Vertebrates are the most dominant.", "It would still be a lower number than invertebrates", "It would change the importance of invertebrates", "It would not change the overall view"],
    correct: 2,
    explanation: "A tenfold increase in known vertebrate species would significantly alter our understanding of animal diversity, potentially shifting the balance of known species and requiring reevaluation of evolutionary relationships and ecological dynamics."
  },
    
    {
        text: "A taxonomic grouping that includes several genera is known as a:",
        options: ["Class", "Order", "Family", "Phylum"],
        correct: 2,
        explanation: "A Family is a taxonomic rank that groups together several related genera.  The order of taxonomic ranks, from most inclusive to least, is: Kingdom, Phylum, Class, Order, Family, Genus, Species."
    },
    {
        text: "What does the sharing of a common family name suggest about the evolutionary history of multiple organisms?",
        options: ["They are in the same species.", "They are in the same order", "They share a relatively recent common ancestor.", "They share very distant common ancestry."],
        correct: 2,
        explanation: "Organisms sharing a common family name have a relatively recent common ancestor. Families are a more specific grouping than orders or phyla in the taxonomic hierarchy, so they indicate a closer relationship than broader classifications. Species within the same family are evolutionarily closer than those within the same order."
    },
    {
        text: "What characteristic, at its core, defines a species?",
        options: ["Similar Morphology", "Geographical Location", "Ability to interbreed", "Similar habitat"],
        correct: 2,
         explanation: "The core defining characteristic of a species is the ability of its members to interbreed and produce viable, fertile offspring. While morphology, geographic location, and habitat can be helpful for identification, they are not the primary defining characteristic of a species."
    },
     {
        text: "The largest taxonomic category of the animal kingdom is:",
        options: ["Phylum", "Class", "Family", "Kingdom"],
        correct: 3,
        explanation: "The Kingdom is the largest and most inclusive taxonomic category in the classification system. All living organisms are grouped into one of several kingdoms (e.g., Animalia, Plantae, Fungi), and these are the broadest groupings."
    },
    {
        text: "Which rank in the taxonomic hierarchy would contain organisms with the broadest shared characteristics?",
        options: ["Class", "Family", "Genus", "Phylum"],
        correct: 3,
        explanation: "Phylum is a higher rank than class, family and genus so contains a broader range of organisms which have more general characteristics in common. As you move down the ranks the shared characteristics become more specific."
    },
     {

        text: "Organisms in the same genus share:",
        options: ["Many characteristics and are closely related", "Few characteristics and distantly related", "Only habitats and are distantly related", "Only species and are closely related"],
        correct: 0,
        explanation: "Organisms within the same genus share many characteristics and are closely related, indicating a recent common ancestor. Genus is a narrower taxonomic category than family, so organisms within a genus share more specific traits and are more closely related to each other than those in the same family."
    },
    {
        text: "What is the primary determinant for distinguishing between diploblastic and triploblastic organisms?",
        options: ["Type of cell wall", "Number of tissue layers during development", "Method of food acquisition", "Symmetry of their body plans"],
        correct: 1,
       explanation: "The primary distinction between diploblastic and triploblastic organisms lies in the number of tissue layers they develop during embryogenesis. Diploblastic organisms have two germ layers (ectoderm and endoderm), while triploblastic organisms have three germ layers (ectoderm, mesoderm, and endoderm)."
    },
    {
        text: "Which embryonic tissue layer is absent in diploblastic organisms?",
        options: ["Ectoderm", "Mesoderm", "Endoderm", "Epidermis"],
        correct: 1,
       explanation: "Diploblastic organisms lack the mesoderm. They only have ectoderm and endoderm which are separated by a jelly-like substance called mesoglea."
    },
    {
        text: "The term 'mesoglea' refers to a key component found in which group?",
        options: ["All coelomate animals", "All triploblastic animals", "All diploblastic animals", "All acoelomate animals"],
        correct: 2,
         explanation: "Mesoglea is a gelatinous, non-cellular substance found in diploblastic animals. It is located between the ectoderm and endoderm layers. It acts as a support and helps maintain their shape."
    },
    {
        text: "What structural feature differentiates the phylum Cnidaria from other animal phyla?",
        options: ["The type of cells that they have", "The number of layers", "The symmetry of the body", "Their method of reproduction"],
        correct: 2,
       explanation: "Cnidarians are characterized by having radial symmetry in their body plans. This distinguishes them from most other animals, which are bilaterally symmetrical. In addition, they have specialized stinging cells called cnidocytes."
    },
  {
        text: "Triploblastic animals are characterized by possessing which tissue?",
        options: ["Ectoderm only", "Endoderm only", "Mesoderm only", "Ectoderm, mesoderm, and endoderm"],
        correct: 3,
       explanation: "Triploblastic animals possess all three primary tissue layers: the ectoderm (outer layer), mesoderm (middle layer), and endoderm (inner layer). These layers give rise to all of the tissues and organs of the animal."
    },
    {
        text: "A 'true coelom' is distinguished from other body cavities by being:",
        options: ["Partially lined with mesoderm", "Fully lined with endoderm", "Fully lined with mesoderm", "Containing a jelly-like substance"],
        correct: 2,
        explanation: "A true coelom is a body cavity that is fully lined with tissue derived from mesoderm. This lining creates a space within which organs can develop and be cushioned, allowing for more complex structures and movement. The fluid filled space is beneficial for several reasons."
    },
    {
        text: "What primary distinction defines a pseudocoelom?",
        options: ["The coelom lacks a lining", "The coelom is fully lined with endoderm", "The coelom is fully lined with mesoderm", "The coelom is only partially lined with mesoderm"],
        correct: 3,
        explanation: "A pseudocoelom is a body cavity that is only partially lined with mesoderm. Specifically, the mesoderm lines the outer edge of the cavity, but  not the inner edge. This difference in lining distinguishes it from a true coelom."
    },
   {
        text: "Which group is characterized by lacking a body cavity?",
        options: ["Coelomates", "Pseudocoelomates", "Acoelomates", "Radiates"],
        correct: 2,
         explanation: "Acoelomates are animals that lack a body cavity. This means there is no fluid-filled space between their digestive tract and their outer body wall. The space is instead filled with mesodermal tissue."
    },
   {
        text: "How would you describe the pattern in which the body parts are arranged around a central axis?",
        options: ["Bilaterally symmetrical", "Biradially symmetrical", "Radially symmetrical", "Asymmetrical"],
        correct: 2,
       explanation: "The arrangement of body parts around a central axis is a characteristic of radially symmetrical animals. They have top and bottom sides but no clear left and right sides, or front and back ends."
    },
    {
        text: "A specific type of symmetry that has some mirror image qualities would be called:",
        options: ["Biradial Symmetry", "Radial Symmetry", "Bilateral Symmetry", "Asymmetrical symmetry"],
        correct: 2,
        explanation: "Bilateral symmetry is characterized by a distinct left and right side, each being a near mirror image of the other. Organisms with bilateral symmetry typically have a head and a tail (anterior and posterior), a top and bottom (dorsal and ventral), and a left and right side."
    },
     {
        text: "What defines the orientation (front/back) for animals that have radial symmetry?",
        options: ["Presence of a head", "Position of the mouth", "The direction of their movement", "The pattern of their body plan"],
         correct: 1,
        explanation: "For radially symmetrical animals, the position of the mouth defines the oral (front) end. This is because they often interact with their environment equally on all sides."
    },
    {
        text: "The aboral end of a radially symmetrical animal would be best described as:",
        options: ["The end closest to the mouth", "The end furthest from the mouth", "The anterior end", "The posterior end"],
        correct: 1,
         explanation: "The aboral end of a radially symmetrical animal is the end that is furthest from its mouth. This term is used as radial symmetrical animals do not have a true head or tail."
    },
     {
        text: "An organism is found to have 3 embryonic layers and a partially lined body cavity. To which category does it belong?",
        options: ["Acoelomate and Diploblastic", "Coelomate and Triploblastic", "Pseudocoelomate and Triploblastic", "Acoelomate and Triploblastic"],
        correct: 2,
        explanation: "An organism with three embryonic layers is triploblastic. The presence of a partially lined body cavity, where the mesoderm does not completely surround the cavity, defines a pseudocoelomate. Thus the organism is a pseudocoelomate and triploblastic."
    },
     {
        text: "If an animal exhibits radial symmetry, and has a mouth, but no other defined features, which phylum might it belong to?",
        options: ["Annelida", "Platyhelminthes", "Chordata", "Cnidaria"],
        correct: 3,
        explanation: "Cnidaria (which includes jellyfish, corals, and sea anemones) are characterized by radial symmetry and possess a mouth but lack defined organ systems or a head. The other phyla listed have bilateral symmetry."
    },
    {
        text: "Which feature is the most relevant to differentiate nematodes from flatworms?",
        options: ["Body symmetry", "Number of germ layers", "Presence of a coelom", "Type of cells that they have"],
        correct: 2,
        explanation: "The presence of a coelom is the most relevant feature. Nematodes are pseudocoelomates (they have a partially lined body cavity), while flatworms are acoelomates (they lack a body cavity). Both groups are bilaterally symmetrical and triploblastic."
    },
    {
        text: "How does having a true coelom potentially benefit an organism's evolutionary success?",
         options: ["Enhances rigidity", "Does not provide an evolutionary advantage", "Provides space for organ development", "Increases speed"],
       correct: 2,
       explanation: "Having a true coelom provides a space for organ development, which allows for more complex organ systems to develop. It also provides cushioning and flexibility, which can increase its success. It also can allow for a more complex circulatory system."
    },
     {
        text: "What does the existence of diploblastic and triploblastic animals suggest about the evolution of tissue complexity?",
        options: ["All animals have a common ancestor", "That they have evolved independently", "It shows different types of body organization", "There is a gradient in development"],
        correct: 3,
        explanation: "The existence of diploblastic and triploblastic animals suggests a gradient in the development of tissue complexity. Diploblastic animals (like cnidarians) are considered more basal with only two tissue layers, while triploblastic animals have evolved a third layer, allowing for greater diversity and structural complexity. This suggests a step-wise pattern of evolutionary development."
    },
    {
        text: "Why are the terms anterior and posterior not relevant for all animal types?",
         options: ["Because all animals have a head and tail", "They have to be radial symmetrical", "They are too basic for complex systems.", "Not all animals display clear head-tail orientation"],
        correct: 3,
        explanation: "The terms 'anterior' and 'posterior' refer to the front and back ends of bilaterally symmetrical animals, respectively. Radially symmetrical animals do not have a distinct head-tail orientation, as they are symmetrical around a central axis, making these terms irrelevant for them."
    },
    {
       text: "If a new animal phylum is discovered to possess a mesoderm but no coelom, how would this impact the currently described groups?",
       options: ["It would confirm the existing classification.", "It might require a new intermediate category.", "It would not impact anything", "It means the data is incorrect"],
       correct: 1,
       explanation: "A new animal phylum with a mesoderm but no coelom would require reevaluation of our current classification. It does not fit existing categories as most animals with a mesoderm also have a coelom. This would suggest a new intermediate grouping such as an 'acoelomate triploblastic' or a 'mesoderm-only' classification is needed."
    },
     {
       text: "Imagine an animal that exhibits both radial and bilateral symmetry in its body plan. How would this influence its classification?",
        options: ["It can only have bilateral symmetry", "It can only have radial symmetry", "It would likely need a new category in terms of classification.", "It would just be considered asymmetrical"],
        correct: 2,
        explanation: "Such an organism with both symmetries would be very unusual and does not fit any of the classifications we currently have. This would likely require a new category to accommodate this novel body plan. Some animals, such as larval starfish have bilateral symmetry but then transition to radial symmetry as an adult."
    },
  {
        text: "If you found a new organism lacking a mesoderm, what type of body plan would be the best comparison?",
        options: ["A triploblastic coelomate", "A diploblastic organism", "A triploblastic pseudocoelomate", "An acoelomate organism"],
        correct: 1,
        explanation: "An organism lacking a mesoderm would be best compared to a diploblastic organism, which also lacks this tissue layer, only having an ectoderm and an endoderm. Acoelomates still have mesoderm just no coelom."
  },
    {
      text: "If vertebrate diversity was found to be much higher, what impact could this have?",
       options: ["No impact because invertebrates are still higher.", "It would indicate a flawed understanding of animal diversity", "Vertebrate species would still be less than invertebrates.", "It will mean the system of classification is incorrect."],
      correct: 1,
     explanation: "If vertebrate diversity was found to be much higher than we currently think, it would mean we have a flawed understanding of the animal groups. It would require re-evaluation of the diversity of life as we currently see it. It wouldn't make the system of classification incorrect, it may just need to be updated with new data."
    },
    {
        text: "How would our understanding of animal evolution change if a new phylum was discovered with a novel coelom formation that is lined with both endoderm and mesoderm?",
        options: ["It would be a completely new category.", "It would not influence the current coelom classification.", "The classification would need adjustment", "The old data must be incorrect"],
         correct: 2,
        explanation: "Our current understanding of coelom formation is that it is lined only by mesoderm (for true coeloms) or partially mesoderm (for pseudocoeloms). The discovery of a new phylum with a coelom lined by both endoderm and mesoderm would mean we have to adjust our classification system and understanding of coelom development. This indicates that there may be different evolutionary paths than we previously thought, rather than old data being wrong."
    },
     {
       text: "Imagine that a mesoglea-like substance was discovered in many groups with triploblastic body plans, how would this alter our view of development?",
      options: ["It would show it is only specific to one group.", "It might indicate that it evolved multiple times in parallel.", "It would prove that our data is incorrect.", "It would not alter our views at all."],
        correct: 2,
       explanation: "The presence of a mesoglea-like substance in triploblastic animals would indicate that this type of structure is not exclusive to diploblastic animals. The discovery of a mesoglea-like substance in diverse groups of triploblastic organisms might indicate it evolved independently multiple times through convergent evolution, thus we would have to re-evaluate our understanding of evolutionary development."
    }, 
  {
    text: "Which taxonomic rank is the most inclusive within the animal kingdom?",
    options: ["Family", "Genus", "Species", "Kingdom"],
    correct: 3,
    explanation: "The Kingdom is the most inclusive (broadest) taxonomic rank in the biological classification system. It is the highest level and contains all the different phyla within it."
  },
  {
    text: "If two organisms share the same family but have different genera, what can you infer about their relationship?",
    options: ["They are in the same species.", "They are in the same order.", "They are in different classes.", "They are distantly related."],
    correct: 1,
    explanation: "If two organisms are in the same family, they must also be in the same order. Families are more specific than orders. They must also be in the same class, phylum and kingdom. Genera are within families, therefore they are not in the same genus."
  },
   {
        text: "What is the defining characteristic of a species within the taxonomic hierarchy?",
        options: ["Members of a species have identical characteristics.", "They occupy similar habitats", "Members can reproduce with each other", "They are very similar in morphology"],
         correct: 2,
        explanation: "The defining characteristic of a species is that its members can interbreed and produce viable, fertile offspring. While species members often share similar characteristics, this is not the primary defining criterion."
    },
  {
    text: "A class is composed of multiple:",
    options: ["Orders", "Genera", "Species", "Families"],
    correct: 0,
    explanation: "A Class is a broad group which consists of multiple related Orders. The hierarchical structure of taxonomy means that class is within phylum and order is within class."
  },
    {
        text: "Why is a phylum considered a higher taxonomic grouping than a class?",
        options: ["Because it contains fewer species", "Because it groups animals with broader shared traits", "Because it groups animals with highly specific traits", "Because it includes fewer organisms"],
        correct: 1,
        explanation: "A phylum is a higher and more inclusive rank than a class. A phylum encompasses animals that share a more general set of common characteristics, while classes are more specific groupings of animals within that phylum."
    },
  {
    text: "What is a correct relationship between the terms?",

    options: ["Kingdom is within the Phylum", "Family is within Order", "Species is within Genus", "Genus is within Family"],
    correct: 3,
    explanation: "The correct relationship is that a Genus is within a Family. All the other answers are incorrect. The taxonomic order is Kingdom, Phylum, Class, Order, Family, Genus, and Species. Therefore the correct relationship has to follow this order."
  },
  {
    text: "What is the primary distinction between vertebrates and invertebrates?",
    options: ["The type of cells that they have", "The presence or absence of a backbone", "The size of organisms", "The habitats they occupy"],
     correct: 1,
    explanation: "Vertebrates are characterized by the presence of a backbone (spinal column), while invertebrates lack a backbone. This is the most significant difference in classifying animals into these two groups."
  },
    {
       text: "Triploblastic animals are characterized by:",
        options: ["Having 2 embryonic layers.", "Having only ectoderm", "Having three embryonic layers", "The presence of mesoglea"],
        correct: 2,
       explanation: "Triploblastic animals are characterized by having three embryonic tissue layers: the ectoderm, mesoderm, and endoderm."
    },
    {
       text: "What does the term mesoglea refer to?",
      options: ["The fluid-filled cavity of a coelom", "The outermost embryonic layer", "A jelly-like layer found in diploblastic organisms", "The inner layer of a triploblastic animal"],
       correct: 2,
       explanation: "Mesoglea is a jelly-like, non-cellular substance found in diploblastic organisms. It is located between the ectoderm and endoderm layers and gives structure and support to the organism."
    },
     {
        text: "Which phylum represents a group of animals that possess a unique structure called mesoglea?",
        options: ["Annelida", "Arthropoda", "Cnidaria", "Platyhelminthes"],
        correct: 2,
        explanation: "Cnidarians, such as jellyfish, corals, and sea anemones, are diploblastic animals characterized by the presence of mesoglea between their ectoderm and endoderm."
    },
 {
        text: "A key characteristic of diploblastic animals is that they lack:",
        options: ["an ectoderm layer.", "a mesoderm layer.", "a coelom", "endoderm"],
         correct: 1,
        explanation: "Diploblastic animals have only two embryonic layers, the ectoderm and endoderm and lack a mesoderm layer. The mesoglea is the structure between the two layers."
    },
  {
    text: "A true coelom is characterized by:",
    options: ["being a fluid-filled body cavity lined with endoderm", "being a fluid-filled body cavity lined with mesoderm", "lacking a body cavity entirely", "having a body cavity filled with mesoglea"],
    correct: 1,
    explanation: "A true coelom is a fluid-filled body cavity that is completely lined with tissue derived from the mesoderm. This lining provides cushioning, flexibility and space for organ development."
  },
    {
        text: "How is a pseudocoelom distinguished from a true coelom?",
        options: ["It lacks a body cavity completely", "It's only partially lined with mesoderm", "It is completely lined with mesoderm", "It is completely lined with endoderm."],
         correct: 1,
        explanation: "A pseudocoelom is a body cavity that is only partially lined with mesoderm. In contrast, a true coelom is fully lined by mesodermal tissue, and acoelomates lack a body cavity."
    },
  {
    text: "Which phylum contains acoelomate animals?",
    options: ["Arthropoda", "Nematoda", "Platyhelminthes", "Echinodermata"],
    correct: 2,
    explanation: "Platyhelminthes, which includes flatworms, are acoelomate animals. Acoelomates lack a body cavity entirely. Arthropoda, Nematoda and Echinodermata are coelomate or pseudocoelomate animals"
  },
  {
    text: "Which term describes the kind of symmetry in which body parts are arranged around a central axis?",
    options: ["Bilateral", "Biradial", "Asymmetrical", "Radial"],
    correct: 3,
    explanation: "Radial symmetry describes the arrangement of body parts around a central axis, like spokes on a wheel, this can be seen in Cnidarians. Bilateral symmetry, in contrast, has a left and right side. Asymmetrical animals have no symmetry."
  },
    {
        text: "What characterizes a biradial symmetry?",
        options: ["Animals with no symmetry", "A modification of radial symmetry with mirror images", "Only 1 line of symmetry", "Having two halves of an organism"],
         correct: 1,
        explanation: "Biradial symmetry is a modified form of radial symmetry where there is a single line of symmetry. This results in mirror images on either side of one of the axes, but not all axes."
    },
   {
        text: "Animals with radial symmetry lack:",
        options: ["An oral end", "An aboral end", "Anterior or posterior ends", "A central axis"],
        correct: 2,
        explanation: "Radially symmetrical animals do not have distinct anterior (front) or posterior (back) ends. Instead, they have an oral end (where the mouth is) and an aboral end (opposite the mouth)."
    },
    {
        text: "The mouth of a radially symmetrical animal is considered the:",
         options: ["Anterior end", "Posterior end", "Oral end", "Aboral end"],
        correct: 2,
        explanation: "The mouth of a radially symmetrical animal is considered the oral end. This is because of their interaction with the environment from the direction of the mouth. They do not have an anterior or posterior."
    },
     {
        text: "An animal is discovered with a mesoderm, and a fluid filled cavity completely lined with mesoderm. What category would it belong to?",
        options: ["Diploblastic and acoelomate", "Triploblastic and pseudocoelomate", "Triploblastic and coelomate", "Triploblastic and acoelomate"],
         correct: 2,
         explanation: "An animal with a mesoderm is triploblastic. A fluid-filled cavity completely lined with mesoderm defines a true coelomate. So, the organism would be a triploblastic coelomate. A pseudocoelom is partially lined with mesoderm. Acoelomates do not have a body cavity."
    },
 {
        text: "An organism displays radial symmetry with distinct oral and aboral ends. Which phylum would it most likely belong to?",
        options: ["Platyhelminthes", "Annelida", "Cnidaria", "Arthropoda"],
        correct: 2,
        explanation: "Cnidaria, which includes jellyfish and sea anemones, is characterized by radial symmetry and have oral and aboral ends. Platyhelminthes, Annelida and Arthropoda display bilateral symmetry."
    }, 
  {
    text: "Imagine that scientists discover a new phylum with a unique coelomic structure. How might this impact current classifications of animals based on the coelom?",
    options: ["No impact since coelom structure is a minor detail", "The existing system may need to be revised and improved.", "Scientists will ignore the finding.", "Coelomic structure is irrelevant"],
    correct: 1,
    explanation: "The discovery of a new coelomic structure would necessitate a review and potential revision of the existing animal classification system based on coelom types. It may also lead to further discoveries and understanding of evolutionary history."
  },
  {
    text: "If scientists determined that a mesoglea was not unique to one group but found in many groups of diploblastic animals, how might this influence our understanding of evolution?",
    options: ["It would show that mesoglea is a common trait", "It would show that classification is incorrect", "It might show that this trait evolved independently in different groups.", "It would imply that all these groups are closely related."],
    correct: 2,
    explanation: "The presence of mesoglea in disparate groups of diploblastic animals could indicate convergent evolution—the independent evolution of similar traits in unrelated organisms. The same selective pressures resulted in similar features in separate lineages."
  }, 
  ],
};

let questions = []; // Placeholder for dynamically loaded questions

// DOM Elements
const authSection = document.getElementById("auth-section");
const courseCodeSection = document.getElementById("course-code-section");
const examSection = document.getElementById("exam-section");
const resultsSection = document.getElementById("results-section");
const loginBtn = document.getElementById("loginBtn");
const selectCourseBtn = document.getElementById("selectCourseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const questionTitle = document.getElementById("question-title");
const answerOptions = document.getElementById("answer-options");
const progressBar = document.querySelector(".progress-bar");
const timerElement = document.getElementById("timer");
const userDetails = document.getElementById("user-details");
const resultsContent = document.getElementById("results-content");
const resultsSummary = document.getElementById("results-summary");
const downloadPDF = document.getElementById("downloadPDF");

// Authentication
loginBtn.addEventListener("click", () => {
  const fullNameInput = document.getElementById("fullName").value.trim();
  const userIDInput = document.getElementById("userID").value.trim();

  if (!fullNameInput || !userIDInput) {
    alert("Please enter both Full Name and User ID.");
    return;
  }

  if (!validUserIDs.includes(userIDInput)) {
    alert("Invalid User ID. Please try again.");
    return;
  }

  fullName = fullNameInput;
  userID = userIDInput;

  authSection.classList.add("hidden");
  courseCodeSection.classList.remove("hidden");
});

// Select Course Code
selectCourseBtn.addEventListener("click", () => {
  const courseCodeInput = document.getElementById("courseCode").value.trim().toUpperCase();

  if (!courseCodeInput || !questionBanks[courseCodeInput]) {
    alert("Invalid course code. Please try again.");
    return;
  }

  selectedCourseCode = courseCodeInput;
  questions = shuffleArray(questionBanks[selectedCourseCode]).slice(0, 50); // Randomize and limit to 50 questions

  courseCodeSection.classList.add("hidden");
  initializeExam();
});

// Shuffle questions randomly
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize Exam
function initializeExam() {
  userDetails.textContent = `Candidate: ${fullName} | Course: ${selectedCourseCode}`;
  startTime = Date.now();
  loadQuestion();
  startTimer();
  examSection.classList.remove("hidden");
}

// Load Current Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];

  questionTitle.textContent = question.text;

  // Populate Answer Options
  answerOptions.innerHTML = question.options
    .map((option, idx) => `
      <button class="answer-btn" onclick="selectAnswer(${idx}, this)">
        ${idx + 1}. ${option}
      </button>
    `)
    .join("");

  highlightSelectedAnswer();
  updateButtons();
  updateProgressBar();
}

// Highlight Previously Selected Answer
function highlightSelectedAnswer() {
  const selectedAnswer = userAnswers[currentQuestionIndex];
  if (selectedAnswer !== undefined) {
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((button, idx) => {
      if (idx === selectedAnswer) {
        button.classList.add("selected");
      }
    });
  }
}

// Select Answer
function selectAnswer(answerIdx, button) {
  userAnswers[currentQuestionIndex] = answerIdx;

  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.classList.remove("selected"));

  button.classList.add("selected");
}

// Update Navigation Buttons
function updateButtons() {
  prevBtn.classList.toggle("hidden", currentQuestionIndex === 0);
  nextBtn.classList.toggle("hidden", currentQuestionIndex === questions.length - 1);
  submitBtn.classList.toggle("hidden", currentQuestionIndex !== questions.length - 1);
}

// Update Progress Bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `Time Remaining: ${minutes}:${seconds.toString().padStart(2, "0")}`;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Your exam will now be submitted.");
      submitExam();
    }
    remainingTime--;
  }, 1000);
}

// Navigate to Previous Question
prevBtn.addEventListener("click", () => {
  currentQuestionIndex--;
  loadQuestion();
});

// Navigate to Next Question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  loadQuestion();
});

// Submit Exam
submitBtn.addEventListener("click", submitExam);

function submitExam() {
  clearInterval(timerInterval); // Stop the timer
  const endTime = Date.now();
  const timeSpent = (endTime - startTime) / 1000; // Total time spent in seconds
  const avgTimePerQuestion = (timeSpent / questions.length).toFixed(2);

  // Performance Report
  const totalAnswered = userAnswers.filter(answer => answer !== undefined).length;
  const totalNotAnswered = questions.length - totalAnswered;
  const totalCorrect = questions.filter((q, i) => userAnswers[i] === q.correct).length;
  const scorePercent = ((totalCorrect / questions.length) * 100).toFixed(2);

  resultsSummary.innerHTML = `
    <p><strong>Performance Report:</strong></p>
    <p>Total Questions Answered: ${totalAnswered}</p>
    <p>Total Questions Not Answered: ${totalNotAnswered}</p>
    <p>Score: ${totalCorrect} / ${questions.length} (${scorePercent}%)</p>
    <p>Average Time Spent per Question: ${avgTimePerQuestion} seconds</p>
  `;

  // Results Content
resultsContent.innerHTML = questions.map((q, i) => {
  const userAnswerIdx = userAnswers[i];
  const userAnswer = userAnswerIdx !== undefined ? q.options[userAnswerIdx] : "Not Answered";
  const correctAnswer = q.options[q.correct];
  const isCorrect = userAnswerIdx === q.correct;
  const result = isCorrect ? "✅ Correct" : "❌ Wrong";

  return `
    <p>
      ${i + 1}. ${q.text}<br>
      Your Answer: <b>${userAnswer}</b> - ${result}<br>
      <b>Correct Answer:</b> ${correctAnswer}<br>
      <i>Explanation:</i> ${q.explanation}
    </p>
  `;
}).join("");


  examSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");

  downloadPDF.addEventListener("click", generatePDF);
}

async function generatePDF() {
  const { jsPDF } = window.jspdf; // Import jsPDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4"
  });

  // Constants
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2; // Width for text
  const lineHeight = 20;
  const sectionSpacing = 10;
  let yOffset = margin;

  // Colors
  const headerBackground = "#4A90E2";
  const sectionHeadingColor = "#333";
  const questionColor = "#000";
  const answerColor = "#28a745";
  const explanationColor = "#555";

  // Header Section
  doc.setFillColor(headerBackground);
  doc.rect(0, 0, pageWidth, 70, "F"); // Draw header background

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor("#FFFFFF");
  doc.text("Obafemi Awolowo University", pageWidth / 2, 40, { align: "center" });

  doc.setFontSize(16);
  doc.text(`Zoology Exam Results`, pageWidth / 2, 60, { align: "center" });
  yOffset += 80;

  // Performance Summary Section
  const totalAnswered = userAnswers.filter(answer => answer !== undefined).length;
  const totalNotAnswered = questions.length - totalAnswered;
  const totalCorrect = questions.filter((q, i) => userAnswers[i] === q.correct).length;
  const scorePercent = ((totalCorrect / questions.length) * 100).toFixed(2);

  doc.setFontSize(16);
  doc.setTextColor(sectionHeadingColor);
  doc.text("Performance Report", margin, yOffset);
  yOffset += lineHeight;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(`Candidate Name: ${fullName}`, margin, yOffset); // Candidate's full name
  yOffset += lineHeight;
  doc.text(`Course: Zoology`, margin, yOffset);
  yOffset += lineHeight;
  doc.text(`Course Code: ${selectedCourseCode}`, margin, yOffset);
  yOffset += lineHeight;
  doc.text(`Total Questions Answered: ${totalAnswered}`, margin, yOffset);
  yOffset += lineHeight;
  doc.text(`Total Questions Not Answered: ${totalNotAnswered}`, margin, yOffset);
  yOffset += lineHeight;
  doc.text(`Score: ${totalCorrect} / ${questions.length} (${scorePercent}%)`, margin, yOffset);
  yOffset += lineHeight * 2;

  // Add Divider Line
  doc.setDrawColor("#000");
  doc.setLineWidth(0.5);
  doc.line(margin, yOffset, pageWidth - margin, yOffset);
  yOffset += sectionSpacing * 2;

  // Questions and Answers Section
  questions.forEach((q, i) => {
    if (yOffset > pageHeight - margin - lineHeight * 6) {
      doc.addPage(); // Add a new page if content exceeds the current page
      yOffset = margin;
    }

    // Question Number and Text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(questionColor);
    const questionText = doc.splitTextToSize(`${i + 1}. ${q.text}`, contentWidth);
    doc.text(questionText, margin, yOffset);
    yOffset += questionText.length * lineHeight;

    // Correct Answer
    doc.setFont("helvetica", "normal");
    doc.setTextColor(answerColor);
    const correctAnswer = doc.splitTextToSize(`Correct Answer: ${q.options[q.correct]}`, contentWidth);
    doc.text(correctAnswer, margin, yOffset);
    yOffset += correctAnswer.length * lineHeight;

    // Explanation
    doc.setFont("helvetica", "italic");
    doc.setTextColor(explanationColor);
    const explanation = doc.splitTextToSize(`Explanation: ${q.explanation}`, contentWidth);
    doc.text(explanation, margin, yOffset);
    yOffset += explanation.length * lineHeight + sectionSpacing;

    // Add Divider Line
    doc.setDrawColor("#ddd");
    doc.setLineWidth(0.5);
    doc.line(margin, yOffset, pageWidth - margin, yOffset);
    yOffset += sectionSpacing * 2;
  });

  // Footer Section
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor("#666");
  const footerY = pageHeight - margin;
  doc.text("Generated by Obafemi Awolowo University Exam Platform", pageWidth / 2, footerY, { align: "center" });

  // Save the PDF
  doc.save(`${fullName}_Exam_Results.pdf`);
}


// Handle Retake Exam Button
document.getElementById("retakeExamBtn").addEventListener("click", () => {
  // Reset user answers and navigation
  currentQuestionIndex = 0;
  userAnswers = [];
  remainingTime = 20 * 60; // Reset timer
  questions = []; // Clear current questions

  // Hide results and show course code selection
  resultsSection.classList.add("hidden");
  courseCodeSection.classList.remove("hidden");
});
