import * as v from 'valibot';

const CustomPropsSchema = v.object({
  ModuleTitleCpt: v.optional(v.string()),
  layout: v.string(),
  showModule: v.boolean(),
  unfoldModule: v.boolean()
})

const ScreenShotSchema = v.object({
  name: v.string(),
  url: v.string(),
  width: v.string(),
  height: v.string(),
  borderRadius: v.string(),
  src: v.string(),
})

const PropItemSchema = v.object({
  chName: v.string(),
  config: v.boolean(),
  iconfont: v.string(),
  show: v.boolean()
})

const CustomCssSchema = v.object({
  css: v.object({}),
  prop: v.string(),
  title: v.string()
})

const ComponentPropsSchema = v.record(v.string(), PropItemSchema)

const DataSourceItemSchema = v.object({
  label: v.string(),
  props: v.object({
    width: v.string()
  }),
  type: v.picklist([
    'input',
    'select',
    'textarea',
    'avatar',
    'datePicker',
    'editor',
    'listLi',
    'date'
  ]),
  value: v.union([v.string(), v.number(), v.array(v.object({})), v.array(v.string())]),
  options: v.optional(v.array(v.object({})))
})

const DataSourceSchema = v.record(v.string(), DataSourceItemSchema)

const componentSchema = v.object({
  category: v.string(),
  commentType: v.string(),
  componentName: v.string(),
  css: v.object({}),
  customCss: v.array(CustomCssSchema),
  customProps: CustomPropsSchema,
  dataSource: DataSourceSchema,
  description: v.string(),
  icon: v.string(),
  id: v.string(),
  keywords: v.string(),
  props: ComponentPropsSchema,
  screenShot: ScreenShotSchema,
  title: v.string()
})

export type ResumeComponent = v.InferOutput<typeof componentSchema>;

const ConfigSchema = v.object({
  title: v.string(),
  layout: v.object({})
})

const RootPropsSchema = v.object({
  pageName: v.string(),
  screenShot: v.string(),
  title: v.string()
})

export const templateJsonSchema = v.object({
  componentsTree: v.array(componentSchema),
  config: ConfigSchema,
  css: v.object({}),
  customCss: v.array(CustomCssSchema),
  id: v.string(),
  props: RootPropsSchema,
  version: v.string(),
  i18n: v.object({}),
  constants: v.object({}),
  meta: v.object({}),
  dataSource: DataSourceSchema
});

export type TemplateJson = v.InferOutput<typeof templateJsonSchema>;


export const templateSchema = v.object({
  id: v.string(),
  template_cover: v.string(),
  template_industry: v.string(),
  template_post: v.string(),
  template_status: v.number(),
  template_style: v.string(),
  template_title: v.string(),
  template_use: v.string(),
  template_views: v.number(),
  template_json: templateJsonSchema,
});

export type Template = v.InferOutput<typeof templateSchema>;

