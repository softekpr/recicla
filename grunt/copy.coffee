module.exports=
  dist:
    files: [
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/public'
        cwd: '<%=files.public.dir%>/'
        src: [
          '*.{ico,png,txt}'
          'images/{,*/}*.{webp}'
          'fonts/**/*'
          'style/font/*'
        ]
      }
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/public/fonts'
        cwd: '<%=files.public.dir%>/vendor/bootstrap/dist/fonts'
        src: [
          '*.*'
        ]
      }
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/public/fonts'
        cwd: '<%=files.public.dir%>/vendor/Font-Awesome/fonts'
        src: [
          '*.*'
        ]
      }
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/server'
        cwd: '<%=files.server.dir%>'
        src: [
          '**/*.js',
          '**/*.json'
        ]
      }
    ]