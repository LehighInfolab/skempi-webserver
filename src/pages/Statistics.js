import React from 'react';

const Statistics = () => {
    return (
        <div className="statistics-page">
            <h2>Database Statistics</h2>

            <section className="statistics-section">
                <h3>Overview of the SKEMPI2Mech Dataset</h3>
                <p>
                    The SKEMPI2Mech dataset spans 248 PDBs and 2639 mutation experiments originally drawn from SKEMPI 2.0.
                    After verification and filtering, 2106 mutations were retained for analysis, of which 1185 mutations were
                    successfully annotated with at least one explicit biochemical mechanism supported by primary literature evidence.
                    Each annotation links a mutation to one or more standardized mechanism tags:
                    <code> [hbond]</code>, <code> [electrostatic]</code>, <code> [salt bridge]</code>, <code> [hydrophobic]</code>, or <code> [steric]</code>,
                    and is traceable to verbatim quotes from the primary literature.
                </p>
                <p>
                    To our knowledge, this represents the first large-scale dataset explicitly linking mutation-induced binding
                    affinity changes to literature-derived mechanistic explanations at residue resolution. Unlike prior SKEMPI
                    refinements, this dataset introduces an alternate feature of interpretability grounded in experimental reasoning.
                </p>
            </section>

            <figure className="statistics-figure">
                <img
                    src={`${process.env.PUBLIC_URL}/statistics_fig.png`}
                    alt="Dataset overview figure"
                    loading="lazy"
                />
            </figure>

            <section className="statistics-section">
                <h4>Annotation Coverage</h4>
                <p>
                    Of the original 2639 mutants reviewed, 2106 entries were successfully annotated while 414 were excluded due to
                    missing structural information, ambiguous mutation descriptions, or inconsistencies between SKEMPI records and
                    literature. In addition, TCR-peptide-MHC complexes were excluded due to the complexity of their large multimeric
                    interfaces and the limited mechanistic specificity reported in literature, making reliable annotation of these
                    complexes infeasible (citation pending).
                </p>
                <p>
                    Among the retained 2106 mutants, 921 mutations were labeled as having no mechanistic discussion in the literature.
                    While these entries lack explicit annotations, they represent an important negative set that reflects limitations
                    in experimental reporting and highlights opportunities for future mechanism-focused studies or automated methods.
                </p>
            </section>

            <figure className="statistics-figure">
                <img
                    src={`${process.env.PUBLIC_URL}/statistics_fig2.png`}
                    alt="Annotation coverage figure"
                    loading="lazy"
                />
            </figure>
        </div>
    );
};

export default Statistics;