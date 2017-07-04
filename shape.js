{
  entities: {
    themes: {
      ...
    },
    chapters: {
      ...
    },
    modules: {
      ...
    }
  }

  documents: {
    ids: [],
  },

  GET_THEMES
  GET_THEMES_SUCCESS
    payload: {
      results: []
    }

  UNLOAD_THEMES = ids => null
  themes: {
    ...
    ids: [] || null,

  },

  themeDetail: {
    id: 2,
  },

  themeChapters: {
    ...
    ids: [],
  }

  chapterDetail: {
    ids:
  }

  chapterModules: {

  }

  moduleDetail: {

  }
  ,
  // Paginate stuff of shit
  imageDocuments: {
    ids: [],
    data: {},
    pagination: {}
  }

}

<Themes />

<Theme>
  {getTheme(themeId)}


  {
    theme => (
      <ThemeDetail '/:themeId' exact>
        {getThemeChapters(theme)}
      </ThemeDetail>
      <EditTheme ':themeId/edit' exact>
        {reduxFormStuff(theme)}
      </EditTheme>
      <Chapter ':themeId/chapter/:chapterId'>
        {getChapter(theme)}

        {chapter => (
          <ChapterDetail '/:chapterId' exact>
            {getChapterModules(chapter)}
          </ChapterDetail>
          <EditChapter '/:chapterId/edit' >
            {reduxFormStuff(chapter)}
          </EditChapter>
          <Module '/modules/:moduleId'>
            <ModuleDetail exact >
            </ModuleDetail>
            <EditModule />
            {module}
          </Module>

        )}
      </Chapter>
    )
  }

</Theme>
